/*jshint esversion: 9*/

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
	b64Data = b64Data.replace(/data:[a-z|\/]+;base64,/g, "");
	const byteCharacters = atob(b64Data);
	// const byteCharacters = b64Data;
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
};

function isB64(b64) {
	b64 = b64.replace(/data:[a-z|\/]+;base64,\//g, "");
	try {
		btoa(b64);
		return true;
	} catch (err) {
		return false;
	}
	return false;
}

function S3_Port(args) {
	if (!args) return;

	let s3;

	const s3_connect = () => {
		AWS.config.update({
			region: args.region,
			credentials: new AWS.CognitoIdentityCredentials({
				IdentityPoolId: args.ID,
			}),
		});
		s3 = new AWS.S3({
			apiVersion: args.apiv,
		});
	};

	const list = (key) => {
		s3.listObjects(
			{ Bucket: args.bucket, Delimiter: key },
			function (err, data) {
				console.log(err, data);
			},
		);
	};

	const upload_presigned = (key, data, evs) => {
		if (!isB64(data.body.file))
			return { then: () => console.log("file is not base64") };
		return new Promise((resolve, reject) => {
			data.body.key = key;
			const body = {};
			for (let p in data.body) {
				body[p] = data.body[p];
			}
			delete body.file;

			/*var xobj = new XMLHttpRequest();
			xobj.overrideMimeType("application/json");
			xobj.open("POST", data.presigned.function, true);
			xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == "200") {
					origenJSON = xobj.responseText;
					myObj = JSON.parse(origenJSON);
					// retornamos el resultado
					resolve(myObj);
				}
			};
			xobj.send(JSON.stringify(body));
			*/
			fetch(data.presigned.function, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "*",
					"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
				},
				body: JSON.stringify(body),
			}).then((resp) => {
				console.log(1111, resp);
				if (resp.error) {
					resolve(resp);
					return;
				}
				if (typeof evs.progress === "function")
					evs.progress({ type: "progress", progress: 50 });
				resp.json().then((data_resp) => {
					if (data_resp.error) {
						resolve(data_resp);
						return;
					}
					if (data.error) return;
					if (data.signature) return;
					if (!data_resp.signature.url) return;
					const signed_url = data_resp.signature.url;

					const form_data = new FormData();
					for (let key in data_resp.signature.fields) {
						form_data.append(key, data_resp.signature.fields[key]);
					}
					form_data.append(
						"file",
						b64toBlob(data.body.file, data.body.type),
					);

					const xhr = new XMLHttpRequest();
					xhr.open("POST", signed_url, true);
					xhr.send(form_data);
					xhr.onload = function (ev) {
						resolve({
							error: xhr.status !== 204,
							type: "complete",
						});
					};
				});
			}).catch(error => console.error(error));
		});
	};

	const upload = (key, file_data) => {
		return new Promise((sucess, error) => {
			s3.upload(
				{
					Bucket: args.bucket,
					Key: key,
					Body: file_data.content,
				},
				(err, data) => {
					if (!err) {
						return sucess(data);
					} else {
						return error(err);
					}
				},
			);
		});
	};

	const ready = (cback) => {
		if (typeof cback === "function") cback(_public);
		return _public;
	};

	const _public = {
		list: list,
		upload: upload,
		upload_presigned: upload_presigned,
	};
	const then = (cback) => {
		const aws = document.createElement("script");
		aws.src =
			"https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.1314.0/aws-sdk.min.js";
		document.body.appendChild(aws);
		aws.onload = () => {
			s3_connect();
			ready(cback);
		};
		return _public;
	};
	return { then: then };
}
