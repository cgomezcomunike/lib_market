/*jshint esversion: 9*/
function PhotoPicture(props) {
    const _bbox = typeof props.bbox === "string" ? document.getElementById(props.bbox) : props.bbox;
    if (!_bbox) return { run: () => {} };
    let _main;
    const order = props.order;
    const user = props.user;
    const api = props.api;
    if (typeof order === "undefined" || typeof user === "undefined" || typeof api === "undefined") return { run: () => {} };
    const _id = props.id || Math.ceil(Math.random() * Date.now());
    const _s3 = new S3_Port({
        apiv: "2006-03-01",
        region: "us-east-1",
        bucket: "s3port-private",
    });
    const run = () => {
        _main = views.main();
        _bbox.appendChild(_main);
        decode_img();
        props.parent.dom_reader(_bbox);
    };
    const optimize_img = async b64 => {
        return new Promise(resolve => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const image = new Image();
            image.src = b64;
            image.onload = () => {
                const maximum = Math.max(image.width, image.height);
                const ratio = 1920 / maximum;
                const finalw = image.width === maximum ? 1920 : image.width * ratio;
                const finalh = image.height === maximum ? 1920 : image.height * ratio;
                canvas.width = finalw;
                canvas.height = finalh;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                const newb64 = canvas.toDataURL("image/jpeg", Math.min(Math.max(props.imgq, 0), 100) / 100);
                resolve(newb64);
            };
        });
    };
    const b642Hex = str => {
        const raw = atob(str.split(",")[1]);
        let result = "";
        for (let i = 0; i < raw.length; i++) {
            const hex = raw.charCodeAt(i).toString(16);
            result += hex.length === 2 ? hex : "0" + hex;
        }
        return result.toUpperCase();
    };
    const b642file = (b64, filename) => {
        var arr = b64.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    const decode_img = () => {
        const file = props.file;
        if (!file) return;
        const freader = new FileReader();
        freader.onload = async () => {
            const b64 = freader.result;
            const img = props.parent.ids(`${_bbox.id}_img_${_id}`);
            img.src = b64;
            const newb64 = await optimize_img(b64);
            const newfile = b642file(newb64, file.name);
            const hex = b642Hex(newb64, "base64");
            localStorage.setItem(`img_${user}_${order}_${_id}`, `${hex}---${props.hash}`);
            upload({ file: newfile, b64: newb64 });
        };
        freader.readAsDataURL(file);
    };
    const upload = data => {
        const loader = props.parent.ids(`${_bbox.id}_${_id}_loader`);
        loader.style.width = "5%";
        _s3.then(s3 => {
            const mime = data.file.type.replace("image/", "");
            const order_split = order.split("");
            const order_dir = order_split.join("/");
            const date = new Date();
            const str_date = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
            s3.upload_presigned(
                `${order_dir}/${order}/${user.replace(/\s/g, "_")}_${str_date}_${_id}.${mime}`,
                {
                    body: {
                        file: data.b64,
                        type: data.file.type,
                        size: data.file.size,
                        real_name: data.file.name,
                        user: props.user,
                        order: props.order,
                        hash: props.hash,
                    },
                    presigned: {
                        function: `${api}?accion=guardar`,
                    },
                },
                {
                    progress: data => {
                        loader.style.width = "50%";
                    },
                }
            ).then(resp => {
                if (resp.error) {
                    alert(resp.msg);
                    return;
                }
                loader.style.width = "100%";
                window.setTimeout(_ => {
                    loader.style.opacity = "0";
                }, 2000);
                if (resp.error === false) {
                    if (typeof props.onUploaded === "function") props.onUploaded();
                    const img = props.parent.ids(`${_bbox.id}_img_${_id}`);
                    img.style.opacity = 1;
                    localStorage.removeItem(`img_${user}_${order}_${_id}`);
                    document.getElementById(`${_bbox.id}_imgdiv_${_id}`).style.backgroundColor = "#00a982";
                    document.getElementById(`${_bbox.id}_${_id}_message`).innerHTML = `<img src='/v2_base/images/icos/tick.svg' />`;
                    return;
                }
            });
        });
    };
    const views = {
        main: () => {
            const section = document.createElement("div");
            section.innerHTML = `<div id='${_bbox.id}_imgdiv_${_id}' class='upload_image' style='position:relative; width: 100px;background-color: #c76500;padding: 5px;border-radius: 5px;margin: 5px;'>
				<img id='${_bbox.id}_img_${_id}' style='width: 100%;opacity:0.5;' />
				<div id='${_bbox.id}_${_id}_loader' style='position:absolute; background-color: #FFFFFF80; height: 100%; top: 0px; left: 0px; transition: all 1s;'></div>
				<div id='${_bbox.id}_${_id}_message' class='process_ico'>
					<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
						<path opacity="0.2" fill="#FFF" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
							<path fill="#FFFFFF" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
							<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite">
							</animateTransform>
						</path>
					</svg>
				</div>
			</div>`;
            return section;
        },
    };
    const _public = {
        run,
        id: _ => _id,
        upload: (b64, file_name) => {
            const file = b642file(b64, file_name);
            props.file = file;
            decode_img();
        },
        clear: () => {
            if (!_bbox) return;
            while (_bbox.childNodes.length > 0) {
                _bbox.removeChild(_bbox.childNodes[0]);
            }
        },
    };
    return _public;
}
function PhotoPicturePendings(props) {
    const _bbox = typeof props.bbox === "string" ? document.getElementById(props.bbox) : props.bbox;
    if (!_bbox) return { run: () => {} };
    let _main;
    const order = props.order;
    const user = props.user;
    const api = props.api;
    if (typeof order === "undefined" || typeof user === "undefined" || typeof api === "undefined") return { run: () => {} };
    const _id = props.id || Math.ceil(Math.random() * Date.now());
    const _s3 = new S3_Port({
        apiv: "2006-03-01",
        region: "us-east-1",
        bucket: "s3port-private",
    });
    const run = () => {
        _main = views.main();
        _bbox.appendChild(_main);
        decode_img();
        props.parent.dom_reader(_bbox);
    };
    const optimize_img = async b64 => {
        return new Promise(resolve => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const image = new Image();
            image.src = b64;
            image.onload = () => {
                const maximum = Math.max(image.width, image.height);
                const ratio = 1920 / maximum;
                const finalw = image.width === maximum ? 1920 : image.width * ratio;
                const finalh = image.height === maximum ? 1920 : image.height * ratio;
                canvas.width = finalw;
                canvas.height = finalh;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                const newb64 = canvas.toDataURL("image/jpeg", Math.min(Math.max(props.imgq, 0), 100) / 100);
                resolve(newb64);
            };
        });
    };
    const b642Hex = str => {
        const raw = atob(str.split(",")[1]);
        let result = "";
        for (let i = 0; i < raw.length; i++) {
            const hex = raw.charCodeAt(i).toString(16);
            result += hex.length === 2 ? hex : "0" + hex;
        }
        return result.toUpperCase();
    };
    const b642file = (b64, filename) => {
        var arr = b64.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    const decode_img = () => {
        const file = props.file;
        if (!file) return;
        const freader = new FileReader();
        freader.onload = async () => {
            const b64 = freader.result;
            const img = props.parent.ids(`${_bbox.id}_img_${_id}`);
            img.src = b64;
            const newb64 = await optimize_img(b64);
            const newfile = b642file(newb64, file.name);
            const hex = b642Hex(newb64, "base64");
            localStorage.setItem(`img_${user}_${order}_${_id}`, `${hex}---${props.hash}`);
            upload({ file: newfile, b64: newb64 });
        };
        freader.readAsDataURL(file);
    };
    const upload = data => {
        _s3.then(s3 => {
            const mime = data.file.type.replace("image/", "");
            const order_split = order.split("");
            const order_dir = order_split.join("/");
            const date = new Date();
            const str_date = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
            s3.upload_presigned(
                `${order_dir}/${order}/${user.replace(/\s/g, "_")}_${str_date}_${_id}.${mime}`,
                {
                    body: {
                        file: data.b64,
                        type: data.file.type,
                        size: data.file.size,
                        real_name: data.file.name,
                        user: props.user,
                        order: props.order,
                        hash: props.hash,
                    },
                    presigned: {
                        function: `${api}?accion=guardar`,
                    },
                },
                {
                    progress: data => {},
                }
            ).then(resp => {
                if (resp.error) {
                    alert(resp.msg);
                    return;
                }
                window.setTimeout(_ => {}, 2000);
                if (resp.error === false) {
                    if (typeof props.onUploaded === "function") props.onUploaded();
                    localStorage.removeItem(`img_${user}_${order}_${_id}`);
                    document.getElementById(`${_bbox.id}_imgdiv_${_id}`).style.backgroundColor = "#00a982";
                    document.getElementById(`${_bbox.id}_${_id}_message`).innerHTML = `Guardado en orden: ${order} <img src='/v2_base/images/icos/tick.svg' />`;
                    window.setTimeout(_ => {
                        const main = props.parent.ids(`${_bbox.id}_imgdiv_${_id}`);
                        main.style.display = "none";
                    }, 2500);
                    return;
                }
            });
        });
    };
    const views = {
        main: () => {
            const section = document.createElement("div");
            section.innerHTML = `<div id='${_bbox.id}_imgdiv_${_id}' class='upload_pending_image' style='position:relative;background-color: #c76500;padding: 5px;border-radius: 5px 0 0 5px;margin: 5px 0;'>
				<img id='${_bbox.id}_img_${_id}' style='display:none' />
				<div id='${_bbox.id}_${_id}_message' class='pending_process_ico'>
					Guardando en orden: ${order}
					<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
						<path opacity="0.2" fill="#FFF" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
							<path fill="#FFFFFF" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
							<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite">
							</animateTransform>
						</path>
					</svg>
				</div>
			</div>`;
            return section;
        },
    };
    const _public = {
        run,
        id: _ => _id,
        upload: (b64, file_name) => {
            const file = b642file(b64, file_name);
            props.file = file;
            decode_img();
        },
        clear: () => {
            if (!_bbox) return;
            while (_bbox.childNodes.length > 0) {
                _bbox.removeChild(_bbox.childNodes[0]);
            }
        },
    };
    return _public;
}

function PhotoCatcher(props) {
    const _bbox = typeof props.bbox === "string" ? document.getElementById(props.bbox) : props.bbox;
    if (!_bbox) return { run: () => {} };
    const _ids = {};
    const _pictures = [];
    let _istatus = true;
    const dom_reader = bbox => {
        const nodes = bbox.querySelectorAll("*");
        for (let node of nodes) {
            if (node.hasAttribute("id")) {
                _ids[node.id] = node;
            }
            const attrs = node.attributes;
            for (let a of attrs) {
                const name = a.name;
                const value = a.value;
                if (name.match(/on[a-z|A-z|0-9|_]/g)) {
                    if (typeof actions[value] !== "function") continue;
                    node[name] = ev => {
                        actions[value]({ ev: ev, me: node });
                    };
                }
            }
        }
    };
    const run = () => {
        _bbox.innerHTML = views.main();
        dom_reader(_bbox);
        actions.check_internet_status();
    };
    const ishex = hexstring => {
        return hexstring.match(/\w{2}/g);
    };
    const hex2B64 = hexstring => {
        return btoa(
            hexstring
                .match(/\w{2}/g)
                .map(function (a) {
                    return String.fromCharCode(parseInt(a, 16));
                })
                .join("")
        );
    };
    const b642file = (b64, filename) => {
        var arr = b64.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    const actions = {
        active_take_photo: () => {
            _ids[`${_bbox.id}_catcher`].click();
        },
        upload_photo: (files, index, data) => {
            _ids[`${_bbox.id}_report`].innerHTML = `<h3>Fotos actuales subidas ${index} de ${files.length}</h3>`;
            if (index >= files.length) {
                return;
            }
            const f = files[index];
            const picture = new PhotoPicture({
                id: data.id,
                bbox: `${_bbox.id}_gallery`,
                data: data,
                parent: _public,
                api: props.api,
                user: props.usuario,
                order: props.orden,
                hash: props.hash,
                imgq: props.imgq,
                file: f,
                onUploaded: () => {
                    actions.upload_photo(files, index + 1, data);
                },
            });
            picture.run();
            _pictures.push(picture);
        },
        take_photo: (data, index = 0) => {
            //actions.upload_photo(data.me.files, 0, data);
            _ids[`${_bbox.id}_report`].innerHTML = `<h3>Fotos actuales subidas ${index} de ${data.me.files.length}</h3>`;
            if (index >= data.me.files.length) {
                return;
            }
            const f = data.me.files[index];
            const picture = new PhotoPicture({
                id: data.id,
                bbox: `${_bbox.id}_gallery`,
                data: data,
                parent: _public,
                api: props.api,
                user: props.usuario,
                order: props.orden,
                imgq: props.imgq,
                hash: props.hash,
                file: f,
                onUploaded: () => {
                    actions.take_photo(data, index + 1);
                },
            });
            picture.run();
            _pictures.push(picture);
        },
        take_photo_pending: (data, index = 0) => {
            _ids[`${_bbox.id}_report`].innerHTML = `<h2>Fotos pendientes subidas ${index} de ${data.me.files.length}</h2>`;
            if (index >= data.me.files.length) {
                return;
            }
            const f = data.me.files[index];
            //for(let f of data.me.files){
            const picture = new PhotoPicturePendings({
                id: data.id,
                bbox: `${_bbox.id}_pendings`,
                data: data,
                parent: _public,
                api: props.api,
                user: props.usuario,
                order: data.orden,
                hash: data.hash,
                imgq: props.imgq,
                file: f,
                onUploaded: () => {
                    actions.take_photo_pending(data, index + 1);
                },
            });
            picture.run();
            _pictures.push(picture);
            //}
        },
        check_internet_status: () => {
            const istatus = _ids[`${_bbox.id}_internet_status`];
            if (window.navigator.onLine) actions.check_pending();
            window.setInterval(_ => {
                _istatus = window.navigator.onLine;
                istatus.innerHTML = _istatus ? "Conectado a internet" : "No hay acceso a internet";
                if (_istatus) {
                    istatus.classList.remove(`${_bbox.id}_no_internet`);
                    window.setTimeout(_ => {
                        istatus.style.opacity = "0";
                    }, 2500);
                } else {
                    istatus.style.opacity = "1";
                    istatus.classList.add(`${_bbox.id}_no_internet`);
                }
            }, 1000);
            window.addEventListener("online", _ => {
                console.log(localStorage.length);
                actions.check_pending();
            });
            window.addEventListener("offline", _ => {});
        },
        get_picture: id => {
            for (let p of _pictures) {
                if (p.id().toString() === id) return p;
            }
        },
        check_pending: () => {
            for (let i = 0; i < localStorage.length; i++) {
                const fkey = localStorage.key(i);
                const isMine = fkey.match(/img_[a-z|A-z|0-9|_|-]+_[0-9]+_[0-9]+/g);
                if (!isMine) continue;
                if (isMine.length === 0) continue;
                const split = fkey.split("_");
                const id = split[split.length - 1];
                const order = split[split.length - 2];
                const user = split[split.length - 3];
                const __hex = localStorage.getItem(fkey);
                const __hex_split = __hex.split("---");
                const hex = __hex_split[0];
                const pending_hash = __hex_split[1];
                if (!ishex(hex)) continue;
                const b64 = hex2B64(hex);
                const ib64 = `data:image/jpeg;base64,${b64}`;
                const picture = actions.get_picture(id);
                if (picture) {
                    picture.upload(ib64, `${Math.ceil(Math.random() * Date.now())}.jpeg`);
                } else {
                    const file = b642file(ib64, `${Math.ceil(Math.random() * Date.now())}.jpeg`);
                    if (props.orden !== order) {
                        actions.take_photo_pending({
                            id,
                            orden: order,
                            usuario: user,
                            me: {
                                files: [file],
                            },
                            hash: pending_hash,
                        });
                    } else {
                        actions.take_photo({
                            id,
                            me: {
                                files: [file],
                            },
                        });
                    }
                }
            }
        },
        clear_lstorage: args => {
            window.localStorage.clear();
            for (let picture of _pictures) {
                picture.clear();
            }
        },
    };
    const reactions = {};
    const views = {
        main: () => {
            return `<div class='${_bbox.id}_main'>
				<div class='${_bbox.id}_bgfilter'></div>
				<div class='${_bbox.id}_content' style='z-index:2'>
					<div class='${_bbox.id}_title'>
						<div>Orden No: <span style=''>${props.orden}</span>&nbsp;&nbsp;&nbsp;&nbsp;Usuario: <span style=''>${props.usuario}</span></div>
					</div>
					<div id='${_bbox.id}_internet_status'></div>
					<!--div id='${_bbox.id}_internet_status'><img id='${_bbox.id}_istatus_img' /></div-->
					<div>
						<input type='file' id='${_bbox.id}_catcher' onchange='take_photo' multiple accept="image/jpeg, image/jpg"/>
						<button class='${_bbox.id}_catcher_btn' onclick='active_take_photo'><img src='/v2_base/images/icos/camera.svg' /></button>
					</div>
					<div><button onclick='clear_lstorage' style="position: fixed;
    bottom: 30px;
    left: 30px;
    border: solid 3px #FFF;
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 100px;
    background-color: #006dbd;
    color: #FFF;
z-index: 1000">Limpiar memoria</button></div>
                    <div><div id='${_bbox.id}_report'></div><div id='${_bbox.id}_pending_report'></div></div>
					<div id='${_bbox.id}_gallery'></div>
					<div id='${_bbox.id}_pendings'></div>
				</div>
			</div>`;
        },
    };
    const _public = {
        run,
        dom_reader,
        reactions,
        ids: k => {
            return _ids[k];
        },
    };
    return _public;
}
