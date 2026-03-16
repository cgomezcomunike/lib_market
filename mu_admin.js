let IMGS_B = "adjunto.concesionariovirtual.co";
let IMGS_URI = "https://adjunto.concesionariovirtual.co";
//const api = "https://0ilcwwjpv6.execute-api.us-east-1.amazonaws.com/default/musados_editor";
const api =
	"https://5zjozq6c1b.execute-api.us-east-1.amazonaws.com/default/CRM-admin-usados";
function anti_money(v) {
	return v.replace(/[\,|\.|\$]/g, "");
}
function money(v, n, x) {
	var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\," : "$") + ")";
	let val = parseInt(v)
		.toFixed(Math.max(0, ~~n))
		.replace(new RegExp(re, "g"), "$&.");
	val = `$${val}`;
	if (val.trim() === "$NaN") val = "$0";
	return val;
}
function anti_km(v) {
	return v.replace(/[\,|\.|\$]/g, "");
}
function set_km(v, n, x) {
	var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\," : "$") + ")";
	let val = parseInt(v)
		.toFixed(Math.max(0, ~~n))
		.replace(new RegExp(re, "g"), "$&.");
	val = `${val}`;
	if (val.trim() === "NaN") val = "0";
	return val;
}
function Main(props) {
	const root = Root(props.root);
	let cards;
	let new_vh_form;
	const init = () => {
		Render({ bbox: root, view: Views.main, actions }).then(run);
	};
	const run = (info) => {
		Api("load_vhs", { concesionario: props.concesionario }).then((vhs) => {
			actions.load_cards({
				root: info.refs.cards,
				vhs:
					vhs.vhs.mdx_inventario_usadosResult ||
					vhs.vhs.mdx_inventario_multiusadosResult,
			});
			if (typeof props.onLoad === "function") {
				props.onLoad(vhs);
			}
		});
	};
	const actions = {
		load_cards: (args) => {
			const { root, vhs } = args;
			cards = new Cards({
				root,
				vhs,
			});
			cards.init();
		},
		new_vh: ({ info }) => {
			document.body.style.overflow = "hidden";
			const new_form = info.refs.new_vh_form;
			new_form.style.display = "block";
		},
		close_info: ({ info }) => {
			document.body.style.overflow = "auto";
			const new_form = info.refs.new_vh_form;
			new_form.style.display = "none";
		},
		submit_vh_data: ({ info }) => {
			const mandatory = [];
			let mandatory_noVal = "";
			const vals = {};
			for (let k in info.refs) {
				if (!k.includes("new_")) continue;
				const node = info.refs[k];
				const v = node.value;
				if (mandatory.includes(k)) {
					if (v.trim().replace(/\s/g, "") === "") {
						const label = node.getAttribute("label");
						node.style.borderBottom = "solid 2px #990000";
						mandatory_noVal += `\n- ${label}`;
						continue;
					}
				}
				vals[k] = v;
			}
			if (mandatory_noVal.trim() !== "") {
				alert(
					`Los siguientes campos son obligatorios:${mandatory_noVal}`,
				);
				return;
			}
			vals.new_precio = anti_money(vals.new_precio);
			vals.new_descuento = anti_money(vals.new_descuento);
			Api("create_new_car", {
				concesionario: props.concesionario,
				data: vals,
			}).then((resp) => {
				const vh = {
					chasis: vals.new_vin,
					marca: vals.new_marca,
					descripcion: vals.new_nombre,
					colorin: vals.new_colorin,
					modelo_ano: vals.new_modelo_ano,
					kilometraje: vals.new_km,
					ciudad: vals.new_ciudad,
					cc: vals.new_cc,
					costo: vals.new_precio,
					descuento: vals.new_descuento,
					tipo_caja: vals.new_tipo_caja,
					tipo_vh: vals.new_tipo_vh,
					tipo_combustible: vals.new_tipo_combustible,
					desctacado: vals.new_desctacado,
					stock: vals.new_stock,
					status: vals.new_status,
					notas: vals.new_descripcion,
				};
				cards.add_new_car({ vh });
				actions.clear_new_car_form({ info });
				actions.close_info({ info });
			});
		},
		clear_new_car_form: ({ info }) => {
			for (let k in info.refs) {
				if (!k.includes("new_")) continue;
				const node = info.refs[k];
				node.value = "";
			}
		},
		set_precio: ({ node, info }) => {
			const value = anti_money(node.value);
			node.value = money(value);
			const descuento = info.refs.new_descuento;
			const _descuento = parseInt(anti_money(descuento.value));
			const print = info.refs.new_descuento_print;
			const diff = parseInt(value) - _descuento;
			print.innerHTML = `Precio final: ${money(diff)}`;
		},
		apply_descuento: ({ node, info }) => {
			const value = anti_money(node.value);
			node.value = money(value);
			const precio = info.refs.new_precio;
			const _precio = parseInt(anti_money(precio.value));
			const print = info.refs.new_descuento_print;
			const diff = _precio - parseInt(value);
			print.innerHTML = `Precio final: ${money(diff)}`;
		},
		/*buscar_vh: ({ info, node }) => {
										const value = node.value;
										const cards = document.querySelectorAll(".card");
										const split = value.split(" ");
										for (let v of split) {
											for (let card of cards) {
												const text = card.innerText;
												if (
													!text
														.replace(/[\s|\n|\r|\t]+/g, "")
														.toUpperCase()
														.includes(v.toUpperCase())
												) {
													card.style.display = "none";
													continue;
												}
												card.style.display = "block";
											}
										}
									},*/
		buscar_vh: ({ info, node }) => {
			const value = node.value;
			const cards = document.querySelectorAll(".card");
			const split = value.split(" ");
			const buffer = [];
			for (let v of split) {
				for (let card of cards) {
					const only_text = card.innerText;
					const split_text = only_text.split("-");
					const text = `${split_text[0] || ""}`;
					card.style.display = "none";
					if (
						text
							.replace(/[\s|\n|\r|\t]*/g, "")
							.toUpperCase()
							.includes(v.toUpperCase())
					) {
						buffer.push(card);
					}
				}
			}
			buffer.forEach((card) => {
				card.style.display = "block";
			});
		},
	};

	const _public = {
		init,
	};
	return _public;
}

function Cards(props) {
	const root = Root(props.root);
	const vhs = props.vhs;
	const cards = [];
	const init = () => {
		Render({ bbox: root, view: Views.cards }).then(run);
	};
	const run = (info) => {
		const { refs } = info;
		for (let c of vhs) {
			actions.add_new_car({ info, vh: c });
		}
	};
	const actions = {
		add_new_car: ({ info, vh }) => {
			const el = document.createElement("div");
			el.classList.add("card");
			const card = new Card({
				root: el,
				data: vh,
			});
			card.init();
			root.appendChild(el);
		},
	};
	const _public = {
		init,
		add_new_car: actions.add_new_car,
	};
	return _public;
}

function Card(props) {
	let _precio = 0;
	const root = Root(props.root);
	const imgs_buffer = [
		{ name: "frontleft", label: "Frontal-Izquierdo" },
		{ name: "frontright", label: "Frontal-Derecho", cover: true },
		{ name: "frotal", label: "Frontal" },
		{ name: "backleft", label: "Trasero-Izquierdo" },
		{ name: "backright", label: "Trasero-Derecho" },
		{ name: "back", label: "Trasero" },
		{ name: "lateral1", label: "Lateral-Izquierdo" },
		{ name: "lateral2", label: "Lateral-Derecho" },
		{ name: "indoor", label: "Interior-Puerta" },
		{ name: "inKM", label: "Interior-Kilometraje" },
		{ name: "inradio", label: "Interior-Radio" },
		{ name: "inboard", label: "Interior-Tablero" },
	];
	let _images;
	const init = () => {
		Render({
			bbox: root,
			view: Views.card,
			actions,
			args: { vh: props.data },
		}).then(run);
	};
	const run = (info) => {
		//const chasis = info.refs.chasis;
		//chasis.innerHTML = `${props.data.chasis}`;
		actions.load_card_info({ info });
	};
	const actions = {
		load_card_info: ({ info }) => {
			const vhdata = props.data;
			const cover = info.refs.cover;
			const marca = info.refs.thumb_marca;
			const placa = info.refs.thumb_placa;
			const chasis = info.refs.thumb_chasis;
			const version = info.refs.thumb_version;
			const precio = info.refs.thumb_precio;
			const imgs = vhdata.imgs || {};
			marca.innerHTML = vhdata.marca;
			placa.innerHTML = vhdata.placa;
			chasis.innerHTML = vhdata.chasis;
			version.innerHTML = vhdata.descripcion;
			const val_precio = parseInt(vhdata.costo);
			const val_descuento = parseInt(vhdata.descuento || 0);
			precio.innerHTML = money(val_precio - val_descuento);
			let cover_url;
			Object.keys(imgs).forEach((k) => {
				const img = imgs[k];
				if (img.cover && typeof cover_url === "undefined") {
					cover_url = img.src.replace("image/", "");
				}
				imgs_buffer.forEach((item) => {
					if (item.name === k) item.src = img.src;
				});
				if (typeof cover_url === "string")
					cover.style.backgroundImage = `url('${cover_url}')`;
			});
			_images = new VhImages({
				root: info.refs.vh_images,
				chasis: props.data.chasis || props.data.placa,
				images: imgs_buffer,
				//onImageUpload: args => actions.upload_img({ info, args }),
				onClickTakePhoto: (args) => {
					actions.show_photo_aligner({ info, photo_data: args });
				},
				onClickRemovePhoto: (args) => {
					actions.remove_photo({ info, photo_data: args });
				},
			});
			_images.init();
			info.refs.loader.style.display = "none";
		},
		toggle_options: ({ info }) => {
			const options = info.refs.options;
			if (options.style.display === "none") {
				options.style.display = "block";
			} else {
				options.style.display = "none";
			}
		},
		show_info: ({ info }) => {
			actions.close_images({ info });
			document.body.style.overflow = "hidden";
			const form = info.refs.my_info;
			form.style.display = "block";
			const km = info.refs.km;
			const ciudad = info.refs.ciudad;
			const precio = info.refs.precio;
			const descuento = info.refs.descuento;
			const tipo_caja = info.refs.tipo_caja;
			const tipo_vh = info.refs.tipo_vh;
			const tipo_combustible = info.refs.tipo_combustible;
			const desctacado = info.refs.desctacado;
			const stock = info.refs.stock;
			const status = info.refs.status;
			const descripcion = info.refs.descripcion;
			const cc = info.refs.cc;
			Api("load_vh_data", {
				vin: props.data.chasis || props.data.placa,
			}).then((resp) => {
				//const dms = resp.vh.dms;
				//const admin = resp.vh.admin;
				const admin = resp.vh;
				km.value = set_km(admin.kilometraje);
				ciudad.value = admin.ciudad || "";
				if (admin.costo) {
					precio.value = money(admin.costo);
					_precio = admin.costo;
				}
				descuento.value = money(admin.descuento);
				tipo_caja.value = admin.tipo_caja || "";
				tipo_vh.value = admin.tipo_vh || "";
				tipo_combustible.value = admin.tipo_combustible || "";
				desctacado.value = admin.desctacado || "no";
				stock.value = admin.stock === 1 ? "disponible" : "vendido";
				status.value = admin.status === 1 ? "activo" : "inactivo";
				descripcion.value = admin.notas || admin.descripcion;
				cc.value = admin.cc || "";
			});
		},
		close_info: ({ info }) => {
			document.body.style.overflow = "auto";
			const form = info.refs.my_info;
			form.style.display = "none";
		},
		remove_photo: ({ info, photo_data }) => {
			const loader = document.getElementById("save_info_loader");
			loader.style.display = "flex";
			Api("delete_image", {
				vin: photo_data.vin,
				name: photo_data.name,
			}).then((resp) => {
				if (resp.error) {
					alert("Error al eliminar esta imagen!");
					return;
				}
				photo_data.bg.style.backgroundImage = "url()";
				if (photo_data.cover) {
					info.refs.cover.style.backgroundImage = "url()";
				}
				alert("Imagen eliminada satisfactoriamente!");
				loader.style.display = "none";
			});
		},
		set_precio: ({ info, node }) => {
			if (node.value.trim() === "") node.value = 0;
			const value = anti_money(node.value);
			node.value = money(value);
		},
		set_km: ({ info, node }) => {
			if (node.value.trim() === "") node.value = 0;
			const value = anti_km(node.value);
			node.value = set_km(value);
		},
		apply_descuento: ({ info, node }) => {
			const value = anti_money(node.value);
			node.value = money(value);
			const print = info.refs.descuento_print;
			const diff = _precio - parseInt(value);
			print.innerHTML = `Precio final: ${money(diff)}`;
		},
		submit_vh_data: ({ info }) => {
			info.refs.save_info_loader.style.display = "block";
			const fkm = info.refs.km;
			const fciudad = info.refs.ciudad;
			const fprecio = info.refs.precio;
			const fdescuento = info.refs.descuento;
			const ftipo_caja = info.refs.tipo_caja;
			const ftipo_vh = info.refs.tipo_vh;
			const ftipo_combustible = info.refs.tipo_combustible;
			const fdesctacado = info.refs.desctacado;
			const fstock = info.refs.stock;
			const fstatus = info.refs.status;
			const fdescripcion = info.refs.descripcion;
			const fcc = info.refs.cc;

			const data = {
				kilometraje: anti_km(fkm.value),
				ciudad: fciudad.value,
				costo: anti_money(fprecio.value),
				tipo_caja: ftipo_caja.value,
				tipo_vh: ftipo_vh.value,
				tipo_combustible: ftipo_combustible.value,
				desctacado: fdesctacado.value,
				stock: fstock.value.trim() === "disponible" ? 1 : 0,
				status: fstatus.value.trim() === "activo" ? 1 : 0,
				notas: fdescripcion.value,
				cc: fcc.value,
				descuento: anti_money(fdescuento.value),
			};
			Api("save_vh_data", {
				data: JSON.stringify(data),
				type: "update",
				vin: props.data.chasis || props.data.placa,
			}).then((resp) => {
				actions.save_vh_data_resp({ info, resp });
				info.refs.save_info_loader.style.display = "none";
			});
		},
		save_vh_data_resp: ({ info, resp }) => {
			alert(resp.error ? resp.msg : "Datos actualizados correctamente!");
		},
		show_load_images: ({ info }) => {
			actions.close_info({ info });
			document.body.style.overflow = "hidden";
			const modal = info.refs.my_images;
			modal.style.display = "block";
		},
		close_images: ({ info }) => {
			document.body.style.overflow = "auto";
			const modal = info.refs.my_images;
			modal.style.display = "none";
		},
		show_photo_aligner: ({ info, photo_data }) => {
			const file_picker = document.createElement("input");
			file_picker.setAttribute("type", "file");
			file_picker.setAttribute(
				"accept",
				"image/png, image/jpeg, image/jpg",
			);
			file_picker.onchange = () => {
				if (file_picker.files.length === 0) return;
				const file = file_picker.files[0];
				const reader = new FileReader();
				reader.onload = (ev) => {
					const loader = document.getElementById("save_info_loader");
					loader.style.display = "flex";
					const src = (ev.target || ev.currentTarget || ev.srcElement)
						.result;
					window.setTimeout(() => {
						resize_image(src).then((base64) => {
							_images
								.upload2s3({
									data: photo_data,
									b64: base64,
									file,
								})
								.then((resp) => {
									actions.upload_img({ info, args: resp });
									_images.change_bg_image({
										info,
										data: photo_data,
										src: base64,
									});
									loader.style.display = "none";
								});
						});
					}, 500);
				};
				reader.readAsDataURL(file);
			};
			file_picker.click();
		},
		close_photo_aligner: ({ info }) => {
			document.body.style.overflow = "auto";
			const modal = info.refs.photo_aligner_bbox;
			modal.style.display = "none";
			info.refs.photo_aligner.innerHTML = "";
		},
		upload_img: ({ info, args }) => {
			const cover = info.refs.cover;
			const id = args.id;
			if (args.cover) cover.style.backgroundImage = `url('${args.img}')`;
			Api(
				"save_image_route",
				{
					vin: props.data.chasis,
					name: args.name,
					cover: args.cover,
					id,
				},
				{
					firma: localStorage.getItem("firma"),
					mulpartname: args.name,
					mulparttype: args.file.type,
				},
			).then((resp) => {});
		},
	};

	const _public = {
		init,
	};
	return _public;
}

function VhImages(props) {
	const _vin = props.chasis || props.placa;
	const root = Root(props.root);
	const _s3 = new S3_Port({
		apiv: "2006-03-01",
		region: "us-east-1",
		bucket: "s3port-private",
	});
	let _vh_image;
	const _images = [];
	const init = () => {
		for (let img of props.images) {
			const bbox = document.createElement("div");
			const img_comp = new VhImage({
				root: bbox,
				title: img.label,
				name: img.name,
				cover: img.cover || false,
				vin: _vin,
				src: (img.src || "").replace("image/", ""),
				//onSelect: actions.upload_img,
				onClickTakePhoto: (data) => {
					if (typeof props.onClickTakePhoto === "function") {
						props.onClickTakePhoto({
							title: img.label,
							name: img.name,
							cover: img.cover || false,
							vin: _vin,
							src: (img.src || "").replace("image/", ""),
						});
					}
				},
				onClickRemovePhoto: (data) => {
					if (typeof props.onClickRemovePhoto === "function") {
						props.onClickRemovePhoto({
							title: img.label,
							name: img.name,
							cover: img.cover || false,
							vin: _vin,
							src: (img.src || "")
								.replace("image/", "")
								.replace("jpeg", "jpg"),
							bg: data.bg,
						});
					}
				},
			});
			img_comp.init();
			_images.push(img_comp);
			root.appendChild(bbox);
		}
	};
	const actions = {
		upload_img: (args) => {
			const name = args.name;
			const b64 = args.img;
			const file = args.file;
			return new Promise((resolve) => {
				_s3.then((s3) => {
					const mime_split = file.name.split(".");
					const mime = mime_split[mime_split.length - 1];
					const order_split = _vin.split("");
					const order_dir = order_split.join("/");
					const date = new Date();
					const str_date = `${date.getFullYear()}_${
						date.getMonth() + 1
					}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
					let id;
					s3.upload_presigned(
						"save_image",
						`${name}.${mime}`,
						{
							body: {
								file: b64,
								type: file.type,
								size: file.size,
								real_name: file.name,
								order: _vin,
							},
						},
						{
							progress: (data) => {},
							onPresigned: (resp) => {
								id = resp.id;
								if (typeof props.onImageUpload === "function") {
									args.id = resp.id;
									props.onImageUpload(args);
								}
							},
						},
					).then((resp) => {
						if (resp.error) {
							alert(resp.msg);
							return;
						}
						resp.id = id;
						resolve(resp);
						alert("Foto guardada!");
					});
				});
			});
		},
	};
	const _public = {
		init,
		upload2s3: ({ data, b64, file }) => {
			return new Promise((resolve) => {
				actions
					.upload_img({ img: b64, name: data.name, file })
					.then((resp) => {
						resp.file = file;
						resp.img = b64;
						resp.name = data.name;
						resp.cover = data.cover;
						resolve(resp);
					});
			});
		},
		change_bg_image: ({ info, data, src }) => {
			for (let img of _images) {
				if (img.get_name().trim() === data.name.trim()) {
					img.set_bgimage({ info, src });
					return;
				}
			}
		},
	};
	return _public;
}

function VhImage(props) {
	const root = Root(props.root);
	const _w = 800;
	const _h = 600;
	const init = () => {
		const vin_split = props.vin.split("");
		const vin_route = vin_split.join("/");
		Render({
			bbox: root,
			view: Views.vh_image,
			actions,
			args: {
				title: props.title,
				cover: props.cover,
				key: `${props.src}`,
			},
		}).then((info) => run);
	};
	const run = (info) => {};
	const actions = {
		click_take_picture: ({ info }) => {
			if (typeof props.onClickTakePhoto === "function") {
				props.onClickTakePhoto();
			}
			return;
			const inputFile = document.createElement("input");
			inputFile.setAttribute("type", "file");
			inputFile.setAttribute(
				"accept",
				"image/jpeg,image/jpg,image/bpm,image/png,image/pneg,image/apng,image/avif,image/gif,image/svg+xml,image/webp,image/tiff,image/apng,image/vnd.microsoft.icon",
			);
			inputFile.setAttribute("multiselect", "false");
			inputFile.onchange = (ev) => {
				actions.picture_taken({ info, ev, node: ev.target });
			};
			inputFile.click();
		},
		click_remove_picture: ({ info }) => {
			if (typeof props.onClickRemovePhoto === "function") {
				props.onClickRemovePhoto({ bg: info.refs.bgimg });
			}
		},
		picture_taken: ({ info, node }) => {
			const files = node.files;
			const reader = new FileReader();
			reader.onload = (ev) => {
				actions.picture_selected({
					info,
					ev,
					node: ev.target,
					file: files[0],
				});
			};
			reader.readAsDataURL(files[0]);
		},
		picture_selected: ({ info, ev, node, file }) => {
			const b64 = node.result;
			const img = new Image();
			img.src = b64;
			img.onload = () => {
				actions.process_photo({ info, img, file });
			};
		},
		process_photo: ({ info, img, file }) => {
			const canvas = document.createElement("canvas");
			const imgw = img.naturalWidth;
			const imgh = img.naturalHeight;
			//if (imgw <= _w || imgh <= _h) return;
			const maxw = Math.max(_w, imgw);
			const minw = Math.min(_w, imgw);
			const deltaw = minw / maxw;
			const nh = imgh * deltaw;
			const nw = imgw * deltaw;
			canvas.width = Math.floor(nw);
			canvas.height = Math.floor(nh);
			const c2d = canvas.getContext("2d");
			c2d.drawImage(img, 0, 0, canvas.width, canvas.height);
			const nb64 = canvas.toDataURL("image/jpeg", 0.75);

			actions.show_bgimage({ info, b64: nb64 });
			if (typeof props.onSelect === "function") {
				props.onSelect({
					img: nb64,
					name: props.name,
					cover: props.cover,
					file,
				});
			}
		},
		show_bgimage: ({ info, b64 }) => {
			const bg = info.refs.bgimg;
			bg.style.backgroundImage = `url('${b64}')`;
		},
	};
	const _public = {
		init,
		get_name: () => props.name,
		set_bgimage: ({ src }) => {
			props.src = src;
			init();
		},
		//show_bgimage,
	};
	return _public;
}

function VhInfo(props) {
	const root = Root(props.root);
	const init = () => {};
}

const Views = {
	main: (args) => {
		return `<style>
			/* HTML: <div class="loader"></div> */
			.loader {
				position: absolute;
				left: calc(50% - 70px/2);
				top: calc(50% - 26px/2);
				width: 70px;
				height: 26px;
				background: #d0af03;
				border-radius: 50px;
				--c:no-repeat radial-gradient(farthest-side,#000 92%,#0000);
				--s:18px 18px;
				-webkit-mask:
					var(--c) left  4px top 50%,
					var(--c) center,
					var(--c) right 4px top 50%,
					linear-gradient(#000 0 0);
					-webkit-mask-composite:xor;
					mask-composite:exclude;
				animation: l1 1.5s infinite;
			}
			@keyframes l1 {
				0%    {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
				16.67%{-webkit-mask-size:var(--s),0    0  ,0    0  ,auto}
				33.33%{-webkit-mask-size:var(--s),var(--s),0    0  ,auto}
				50%   {-webkit-mask-size:var(--s),var(--s),var(--s),auto}
				66.67%{-webkit-mask-size:0    0  ,var(--s),var(--s),auto}
				83.33%{-webkit-mask-size:0    0  ,0    0  ,var(--s),auto}
				100%  {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
			}
			.modal_header{
				display: flex;
				max-width: 500px;
				margin: auto;
				justify-content: space-between;
			}
		</style>
		<div>
			<header class='baldosas_container'>
				<div>
					<input type='text' class='campo_text' placeholder='Buscar vehiculo' onkeyup='buscar_vh'>
				</div>
				<!--div style='text-align: center'><button class='app_btn add_vh' onClick="new_vh">Nuevo vehiculo</button></div-->
			</header>
			<section ref="cards" class='cards'>Cargando...</section>
			<section ref="new_vh_form" class='card_modal'>
				<button onclick='close_info' class='app_btn'>Cerrar</button>
				${Views.info_form()}
			</section>
		</div>
		<div id="save_info_loader" style="z-index: 10000; display:none; background-color:#00000090; position: fixed; width:100%; height: 100%; left: 0; top: 0"><div class="loader"></div></div>`;
	},
	card: (args) => {
		return `<section style='position:relative;'>
			<div ref='cover' class='image' onclick="show_info"></div>
			<button onclick="toggle_options" class='app_btn options'></button>
			<div ref='options' style='display: none;position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #00000090;'>
				<div class='card_opts'>
					<button class='app_btn options_btn' onclick='show_info'>Informacion</button>
					<button class='app_btn options_btn' onclick='show_load_images'>Fotos</button>
				</div>
			</div>
			<div style='padding-top: 10px' onclick="show_info">
				<div style=''>
					<div class='card_text marca' ref='thumb_marca'></div>
					<div class='card_text placa' ref='thumb_placa'></div>
					<div class='card_text placa' ref='thumb_chasis'></div>
				</div>
				<div class='card_text version' ref='thumb_version'></div>
				<div class='card_text precio' ref='thumb_precio'></div>
			</div>
			<div class="loader" ref="loader"></div>
		</section>
		<section ref='my_info' class='card_modal'>
			<div class="modal_header">
				<button onclick='show_load_images' class='app_btn'>Subir fotos</button>
				<button onclick='close_info' class='app_btn'>Cerrar</button>
			</div>
			${Views.info_form(args.vh)}
		</section>
		<section ref='my_images' class='card_modal'>
			<div class="modal_header">
				<button onclick='show_info' class='app_btn'>Informacion</button>
				<button onclick='close_images' class='app_btn'>Cerrar</button>
			</div>
			<div ref='vh_images' class='baldosas_container'></div>
		</section>
		<section ref="photo_aligner_bbox" class="card_modal">
			<button onclick='close_photo_aligner' class='app_btn'>Cerrar</button>
			<div ref="photo_aligner"></div>
		</section>`;
	},
	cards: (args) => {
		return ``;
	},
	menu_marcas: (args) => {
		return `<select class='campo_text' label='Marcas' ${
			typeof args.ref === "string" ? `ref='${args.ref}'` : ""
		}>
			<option value="AMG" ${args.marca === "AMG" ? "selected" : ""}>AMG</option>
			<option value="AUDI" ${args.marca === "AUDI" ? "selected" : ""}>AUDI</option>
			<option value="BMW" ${args.marca === "BMW" ? "selected" : ""}>BMW</option>
			<option value="BYD" ${args.marca === "BYD" ? "selected" : ""}>BYD</option>
			<option value="CHEVROLET" ${
				args.marca === "CHEVROLET" ? "selected" : ""
			}>CHEVROLET</option>
			<option value="CHRYSLER" ${
				args.marca === "CHRYSLER" ? "selected" : ""
			}>CHRYSLER</option>
			<option value="CITROÃ‹N" ${
				args.marca === "CITROÃ‹N" ? "selected" : ""
			}>CITROÃ‹N</option>
			<option value="DFSK" ${args.marca === "DFSK" ? "selected" : ""}>DFSK</option>
			<option value="DODGE" ${args.marca === "DODGE" ? "selected" : ""}>DODGE</option>
			<option value="FIAT" ${args.marca === "FIAT" ? "selected" : ""}>FIAT</option>
			<option value="FORD" ${args.marca === "FORD" ? "selected" : ""}>FORD</option>
			<option value="FOTON" ${args.marca === "FOTON" ? "selected" : ""}>FOTON</option>
			<option value="HONDA" ${args.marca === "HONDA" ? "selected" : ""}>HONDA</option>
			<option value="HYUNDAI" ${
				args.marca === "HYUNDAI" ? "selected" : ""
			}>HYUNDAI</option>
			<option value="JAGUAR" ${
				args.marca === "JAGUAR" ? "selected" : ""
			}>JAGUAR</option>
			<option value="JEEP" ${args.marca === "JEEP" ? "selected" : ""}>JEEP</option>
			<option value="KIA" ${args.marca === "KIA" ? "selected" : ""}>KIA</option>
			<option value="KTM" ${args.marca === "KTM" ? "selected" : ""}>KTM</option>
			<option value="LAMBORGHINI" ${
				args.marca === "LAMBORGHINI" ? "selected" : ""
			}>LAMBORGHINI</option>
			<option value="LAND ROVER" ${
				args.marca === "LAND ROVER" ? "selected" : ""
			}>LAND ROVER</option>
			<option value="MAZDA" ${args.marca === "MAZDA" ? "selected" : ""}>MAZDA</option>
			<option value="MERCEDES-BENZ" ${
				args.marca === "MERCEDES-BENZ" ? "selected" : ""
			}>MERCEDES-BENZ</option>
			<option value="MG" ${args.marca === "MG" ? "selected" : ""}>MG</option>
			<option value="MINI" ${args.marca === "MINI" ? "selected" : ""}>MINI</option>
			<option value="MITSUBISHI" ${
				args.marca === "MITSUBISHI" ? "selected" : ""
			}>MITSUBISHI</option>
			<option value="NISSAN" ${
				args.marca === "NISSAN" ? "selected" : ""
			}>NISSAN</option>
			<option value="OPEL" ${args.marca === "OPEL" ? "selected" : ""}>OPEL</option>
			<option value="PEUGEOT" ${
				args.marca === "PEUGEOT" ? "selected" : ""
			}>PEUGEOT</option>
			<option value="PORSCHE" ${
				args.marca === "PORSCHE" ? "selected" : ""
			}>PORSCHE</option>
			<option value="RAM" ${args.marca === "RAM" ? "selected" : ""}>RAM</option>
			<option value="RENAULT" ${
				args.marca === "RENAULT" ? "selected" : ""
			}>RENAULT</option>
			<option value="SSANYONG" ${
				args.marca === "SSANYONG" ? "selected" : ""
			}>SSANYONG</option>
			<option value="SEAT" ${args.marca === "SEAT" ? "selected" : ""}>SEAT</option>
			<option value="SKODA" ${args.marca === "SKODA" ? "selected" : ""}>SKODA</option>
			<option value="SMART" ${args.marca === "SMART" ? "selected" : ""}>SMART</option>
			<option value="SUBARU" ${
				args.marca === "SUBARU" ? "selected" : ""
			}>SUBARU</option>
			<option value="SUZUKI" ${
				args.marca === "SUZUKI" ? "selected" : ""
			}>SUZUKI</option>
			<option value="TOYOTA" ${
				args.marca === "TOYOTA" ? "selected" : ""
			}>TOYOTA</option>
			<option value="TESLA" ${args.marca === "TESLA" ? "selected" : ""}>TESLA</option>
			<option value="USUZU" ${args.marca === "USUZU" ? "selected" : ""}>USUZU</option>
			<option value="VOLKSWAGEN" ${
				args.marca === "VOLKSWAGEN" ? "selected" : ""
			}>VOLKSWAGEN</option>
			<option value="VOLVO" ${args.marca === "VOLVO" ? "selected" : ""}>VOLVO</option>
			<option value="OTRAS MARCAS" ${
				args.marca === "OTRAS MARCAS" ? "selected" : ""
			}>OTRAS MARCAS</option>
		</select>`;
	},
	menu_ciudades: (args) => {
		return `<select class="campo_text" label="Ciudad" ${
			typeof args.ref === "string" ? `ref="${args.ref}"` : ""
		}>
			<option value="ACAÍAS" ${
				args.ciudad === "ACACÍAS" ? "selected" : ""
			}>ACACÍAS</option>
			<option value="AGUACHICA" ${
				args.ciudad === "AGUACHICA" ? "selected" : ""
			}>AGUACHICA</option>
			<option value="AGUSTÍN" ${
				args.ciudad === "AGUSTÍN" ? "selected" : ""
			}>AGUSTÍN</option>
			<option value="APARTADÓ" ${
				args.ciudad === "APARTADÓ" ? "selected" : ""
			}>APARTADÓ</option>
			<option value="ARAUCA" ${
				args.ciudad === "ARAUCA" ? "selected" : ""
			}>ARAUCA</option>
			<option value="ARAUQUITA" ${
				args.ciudad === "ARAUQUITA" ? "selected" : ""
			}>ARAUQUITA</option>
			<option value="ARJONA" ${
				args.ciudad === "ARJONA" ? "selected" : ""
			}>ARJONA</option>
			<option value="ARMENIA" ${
				args.ciudad === "ARMENIA" ? "selected" : ""
			}>ARMENIA</option>
			<option value="BARANOA" ${
				args.ciudad === "BARANOA" ? "selected" : ""
			}>BARANOA</option>
			<option value="BARBACOAS" ${
				args.ciudad === "BARBACOAS" ? "selected" : ""
			}>BARBACOAS</option>
			<option value="BARBOSA" ${
				args.ciudad === "BARBOSA" ? "selected" : ""
			}>BARBOSA</option>
			<option value="BARRANCABERMEJA" ${
				args.ciudad === "BARRANCABERMEJA" ? "selected" : ""
			}>BARRANCABERMEJA</option>
			<option value="BARRANQUILLA" ${
				args.ciudad === "BARRANQUILLA" ? "selected" : ""
			}>BARRANQUILLA</option>
			<option value="BELLO" ${
				args.ciudad === "BELLO" ? "selected" : ""
			}>BELLO</option>
			<option value="BOGOTÁ" ${
				args.ciudad === "BOGOTÁ" ? "selected" : ""
			}>BOGOTÁ</option>
			<option value="BUCARAMANGA" ${
				args.ciudad === "BUCARAMANGA" ? "selected" : ""
			}>BUCARAMANGA</option>
			<option value="BUENAVENTURA" ${
				args.ciudad === "BUENAVENTURA" ? "selected" : ""
			}>BUENAVENTURA</option>
			<option value="BUGA" ${args.ciudad === "BUGA" ? "selected" : ""}>BUGA</option>
			<option value="CAJICÁ" ${
				args.ciudad === "CAJICÁ" ? "selected" : ""
			}>CAJICÁ</option>
			<option value="CALARCÁ" ${
				args.ciudad === "CALARCÁ" ? "selected" : ""
			}>CALARCÁ</option>
			<option value="CALDAS" ${
				args.ciudad === "CALDAS" ? "selected" : ""
			}>CALDAS</option>
			<option value="CALI" ${args.ciudad === "CALI" ? "selected" : ""}>CALI</option>
			<option value="CANDELARIA" ${
				args.ciudad === "CANDELARIA" ? "selected" : ""
			}>CANDELARIA</option>
			<option value="CAREPA" ${
				args.ciudad === "CAREPA" ? "selected" : ""
			}>CAREPA</option>
			<option value="CARTAGENA" ${
				args.ciudad === "CARTAGENA" ? "selected" : ""
			}>CARTAGENA</option>
			<option value="CARTAGO" ${
				args.ciudad === "CARTAGO" ? "selected" : ""
			}>CARTAGO</option>
			<option value="CAUCASIA" ${
				args.ciudad === "CAUCASIA" ? "selected" : ""
			}>CAUCASIA</option>
			<option value="CERETÉ" ${
				args.ciudad === "CERETÉ" ? "selected" : ""
			}>CERETÉ</option>
			<option value="CHAPARRAL" ${
				args.ciudad === "CHAPARRAL" ? "selected" : ""
			}>CHAPARRAL</option>
			<option value="CHIGORODÓ ${
				args.ciudad === "CHIGORODÓ" ? "selected" : ""
			}>CHIGORODÓ</option>
			<option value="CHINCHINÁ" ${
				args.ciudad === "CHINCHINÁ" ? "selected" : ""
			}>CHINCHINÁ</option>
			<option value="CHIQUINQUIRÁ" ${
				args.ciudad === "CHIQUINQUIRÁ" ? "selected" : ""
			}>CHIQUINQUIRÁ</option>
			<option value="CHÍA" ${args.ciudad === "CHÍA" ? "selected" : ""}>CHÍA</option>
			<option value="CIÉNAGA" ${
				args.ciudad === "CIÉNAGA" ? "selected" : ""
			}>CIÉNAGA</option>
			<option value="CIÉNAGA DE ORO" ${
				args.ciudad === "CIÉNAGA DE ORO" ? "selected" : ""
			}>CIÉNAGA DE ORO</option>
			<option value="COPACABANA" ${
				args.ciudad === "COPACABANA" ? "selected" : ""
			}>COPACABANA</option>
			<option value="COROZAL" ${
				args.ciudad === "COROZAL" ? "selected" : ""
			}>COROZAL</option>
			<option value="CUMARIBO" ${
				args.ciudad === "CUMARIBO" ? "selected" : ""
			}>CUMARIBO</option>
			<option value="CÚCUTA" ${
				args.ciudad === "CÚCUTA" ? "selected" : ""
			}>CÚCUTA</option>
			<option value="DOSQUEBRADAS" ${
				args.ciudad === "DOSQUEBRADAS" ? "selected" : ""
			}>DOSQUEBRADAS</option>
			<option value="DUITAMA" ${
				args.ciudad === "DUITAMA" ? "selected" : ""
			}>DUITAMA</option>
			<option value="EL BAGRE" ${
				args.ciudad === "EL BAGRE" ? "selected" : ""
			}>EL BAGRE</option>
			<option value="EL BANCO" ${
				args.ciudad === "EL BANCO" ? "selected" : ""
			}>EL BANCO</option>
			<option value="EL CARMEN DE BOLÍVAR" ${
				args.ciudad === "EL CARMEN DE BOLÍVAR" ? "selected" : ""
			}>EL CARMEN DE BOLÍVAR</option>
			<option value="EL CARMEN DE VIBORAL" ${
				args.ciudad === "EL CARMEN DE VIBORAL" ? "selected" : ""
			}>EL CARMEN DE VIBORAL</option>
			<option value="EL CERRITO" ${
				args.ciudad === "EL CERRITO" ? "selected" : ""
			}>EL CERRITO</option>
			<option value="EL TAMBO" ${
				args.ciudad === "EL TAMBO" ? "selected" : ""
			}>EL TAMBO</option>
			<option value="ENVIGADO" ${
				args.ciudad === "ENVIGADO" ? "selected" : ""
			}>ENVIGADO</option>
			<option value="ESPINAL" ${
				args.ciudad === "ESPINAL" ? "selected" : ""
			}>ESPINAL</option>
			<option value="FACATATIVÁ" ${
				args.ciudad === "FACATATIVÁ" ? "selected" : ""
			}>FACATATIVÁ</option>
			<option value="FLORENCIA" ${
				args.ciudad === "FLORENCIA" ? "selected" : ""
			}>FLORENCIA</option>
			<option value="FLORIDA" ${
				args.ciudad === "FLORIDA" ? "selected" : ""
			}>FLORIDA</option>
			<option value="FLORIDABLANCA" ${
				args.ciudad === "FLORIDABLANCA" ? "selected" : ""
			}>FLORIDABLANCA</option>
			<option value="FUNDACIÓN" ${
				args.ciudad === "FUNDACIÓN" ? "selected" : ""
			}>FUNDACIÓN</option>
			<option value="FUNZA" ${
				args.ciudad === "FUNZA" ? "selected" : ""
			}>FUNZA</option>
			<option value="FUSAGASUGÁ" ${
				args.ciudad === "FUSAGASUGÁ" ? "selected" : ""
			}>FUSAGASUGÁ</option>
			<option value="GALAPA" ${
				args.ciudad === "GALAPA" ? "selected" : ""
			}>GALAPA</option>
			<option value="GARZÓN" ${
				args.ciudad === "GARZÓN" ? "selected" : ""
			}>GARZÓN</option>
			<option value="GIRARDOT" ${
				args.ciudad === "GIRARDOT" ? "selected" : ""
			}>GIRARDOT</option>
			<option value="GIRARDOTA" ${
				args.ciudad === "GIRARDOTA" ? "selected" : ""
			}>GIRARDOTA</option>
			<option value="GIRÓN" ${
				args.ciudad === "GIRÓN" ? "selected" : ""
			}>GIRÓN</option>
			<option value="GRANADA" ${
				args.ciudad === "GRANADA" ? "selected" : ""
			}>GRANADA</option>
			<option value="GUARNE" ${
				args.ciudad === "GUARNE" ? "selected" : ""
			}>GUARNE</option>
			<option value="IBAGUÉ" ${
				args.ciudad === "IBAGUÉ" ? "selected" : ""
			}>IBAGUÉ</option>
			<option value="IPIALES" ${
				args.ciudad === "IPIALES" ? "selected" : ""
			}>IPIALES</option>
			<option value="ITAGUÍ" ${
				args.ciudad === "ITAGUÍ" ? "selected" : ""
			}>ITAGUÍ</option>
			<option value="JAMUNDÍ" ${
				args.ciudad === "JAMUNDÍ" ? "selected" : ""
			}>JAMUNDÍ</option>
			<option value="LA CEJA" ${
				args.ciudad === "LA CEJA" ? "selected" : ""
			}>LA CEJA</option>
			<option value="LA DORADA" ${
				args.ciudad === "LA DORADA" ? "selected" : ""
			}>LA DORADA</option>
			<option value="LA ESTRELLA" ${
				args.ciudad === "LA ESTRELLA" ? "selected" : ""
			}>LA ESTRELLA</option>
			<option value="LA JAGUA DE IBIRICO" ${
				args.ciudad === "LA JAGUA DE IBIRICO" ? "selected" : ""
			}>LA JAGUA DE IBIRICO</option>
			<option value="LA PLATA" ${
				args.ciudad === "LA PLATA" ? "selected" : ""
			}>LA PLATA</option>
			<option value="LETICIA" ${
				args.ciudad === "LETICIA" ? "selected" : ""
			}>LETICIA</option>
			<option value="LORICA" ${
				args.ciudad === "LORICA" ? "selected" : ""
			}>LORICA</option>
			<option value="LOS PATIOS" ${
				args.ciudad === "LOS PATIOS" ? "selected" : ""
			}>LOS PATIOS</option>
			<option value="MADRID" ${
				args.ciudad === "MADRID" ? "selected" : ""
			}>MADRID</option>
			<option value="MAGANGUÉ" ${
				args.ciudad === "MAGANGUÉ" ? "selected" : ""
			}>MAGANGUÉ</option>
			<option value="MAICAO" ${
				args.ciudad === "MAICAO" ? "selected" : ""
			}>MAICAO</option>
			<option value="MALAMBO" ${
				args.ciudad === "MALAMBO" ? "selected" : ""
			}>MALAMBO</option>
			<option value="MANAURE	BANDERA" ${
				args.ciudad === "MANAURE	BANDERA" ? "selected" : ""
			}>MANAURE	BANDERA</option>
			<option value="MANIZALES" ${
				args.ciudad === "MANIZALES" ? "selected" : ""
			}>MANIZALES</option>
			<option value="MARINILLA" ${
				args.ciudad === "MARINILLA" ? "selected" : ""
			}>MARINILLA</option>
			<option value="MARÍA LA BAJA" ${
				args.ciudad === "MARÍA LA BAJA" ? "selected" : ""
			}>MARÍA LA BAJA</option>
			<option value="MEDELLÍN" ${
				args.ciudad === "MEDELLÍN" ? "selected" : ""
			}>MEDELLÍN</option>
			<option value="MOCOA" ${
				args.ciudad === "MOCOA" ? "selected" : ""
			}>MOCOA</option>
			<option value="MONTELÍBANO" ${
				args.ciudad === "MONTELÍBANO" ? "selected" : ""
			}>MONTELÍBANO</option>
			<option value="MONTERÍA" ${
				args.ciudad === "MONTERÍA" ? "selected" : ""
			}>MONTERÍA</option>
			<option value="MOSQUERA" ${
				args.ciudad === "MOSQUERA" ? "selected" : ""
			}>MOSQUERA</option>
			<option value="NEIVA" ${
				args.ciudad === "NEIVA" ? "selected" : ""
			}>NEIVA</option>
			<option value="OCAÑA" ${
				args.ciudad === "OCAÑA" ? "selected" : ""
			}>OCAÑA</option>
			<option value="PALMIRA" ${
				args.ciudad === "PALMIRA" ? "selected" : ""
			}>PALMIRA</option>
			<option value="PAMPLONA" ${
				args.ciudad === "PAMPLONA" ? "selected" : ""
			}>PAMPLONA</option>
			<option value="PASTO" ${
				args.ciudad === "PASTO" ? "selected" : ""
			}>PASTO</option>
			<option value="PEREIRA" ${
				args.ciudad === "PEREIRA" ? "selected" : ""
			}>PEREIRA</option>
			<option value="PIEDECUESTA" ${
				args.ciudad === "PIEDECUESTA" ? "selected" : ""
			}>PIEDECUESTA</option>
			<option value="PITALITO" ${
				args.ciudad === "PITALITO" ? "selected" : ""
			}>PITALITO</option>
			<option value="PLANETA RICA" ${
				args.ciudad === "PLANETA RICA" ? "selected" : ""
			}>PLANETA RICA</option>
			<option value="PLATO" ${
				args.ciudad === "PLATO" ? "selected" : ""
			}>PLATO</option>
			<option value="POPAYÁN" ${
				args.ciudad === "POPAYÁN" ? "selected" : ""
			}>POPAYÁN</option>
			<option value="PUERTO ASÍS" ${
				args.ciudad === "PUERTO ASÍS" ? "selected" : ""
			}>PUERTO ASÍS</option>
			<option value="PUERTO COLOMBIA" ${
				args.ciudad === "PUERTO COLOMBIA" ? "selected" : ""
			}>PUERTO COLOMBIA</option>
			<option value="QUIBDÓ" ${
				args.ciudad === "QUIBDÓ" ? "selected" : ""
			}>QUIBDÓ</option>
			<option value="RIOHACHA" ${
				args.ciudad === "RIOHACHA" ? "selected" : ""
			}>RIOHACHA</option>
			<option value="RIONEGRO" ${
				args.ciudad === "RIONEGRO" ? "selected" : ""
			}>RIONEGRO</option>
			<option value="RIOSUCIO" ${
				args.ciudad === "RIOSUCIO" ? "selected" : ""
			}>RIOSUCIO</option>
			<option value="RIOSUCIO" ${
				args.ciudad === "RIOSUCIO" ? "selected" : ""
			}>RIOSUCIO</option>
			<option value="SABANALARGA" ${
				args.ciudad === "SABANALARGA" ? "selected" : ""
			}>SABANALARGA</option>
			<option value="SABANETA" ${
				args.ciudad === "SABANETA" ? "selected" : ""
			}>SABANETA</option>
			<option value="SAHAGÚN" ${
				args.ciudad === "SAHAGÚN" ? "selected" : ""
			}>SAHAGÚN</option>
			<option value="SAMPUÉS" ${
				args.ciudad === "SAMPUÉS" ? "selected" : ""
			}>SAMPUÉS</option>
			<option value="SAN ANDRÉS" ${
				args.ciudad === "SAN ANDRÉS" ? "selected" : ""
			}>SAN ANDRÉS</option>
			<option value="SAN GIL" ${
				args.ciudad === "SAN GIL" ? "selected" : ""
			}>SAN GIL</option>
			<option value="SAN JOSÉ DEL GUAVIARE" ${
				args.ciudad === "SAN JOSÉ DEL GUAVIARE" ? "selected" : ""
			}>SAN JOSÉ DEL GUAVIARE</option>
			<option value="SAN JUAN DEL CESAR" ${
				args.ciudad === "SAN JUAN DEL CESAR" ? "selected" : ""
			}>SAN JUAN DEL CESAR</option>
			<option value="SAN MARCOS" ${
				args.ciudad === "SAN MARCOS" ? "selected" : ""
			}>SAN MARCOS</option>
			<option value="SAN ONOFRE" ${
				args.ciudad === "SAN ONOFRE" ? "selected" : ""
			}>SAN ONOFRE</option>
			<option value="SAN PELAYO" ${
				args.ciudad === "SAN PELAYO" ? "selected" : ""
			}>SAN PELAYO</option>
			<option value="SAN VICENTE DEL CAGUÁN" ${
				args.ciudad === "SAN VICENTE DEL CAGUÁN" ? "selected" : ""
			}>SAN VICENTE DEL CAGUÁN</option>
			<option value="SANTA" ${
				args.ciudad === "SANTA" ? "selected" : ""
			}>SANTA</option>
			<option value="SANTA ROSA DE CABAL" ${
				args.ciudad === "SANTA ROSA DE CABAL" ? "selected" : ""
			}>SANTA ROSA DE CABAL</option>
			<option value="SANTANDER" ${
				args.ciudad === "SANTANDER" ? "selected" : ""
			}>SANTANDER</option>
			<option value="SARAVENA" ${
				args.ciudad === "SARAVENA" ? "selected" : ""
			}>SARAVENA</option>
			<option value="SINCELEJO" ${
				args.ciudad === "SINCELEJO" ? "selected" : ""
			}>SINCELEJO</option>
			<option value="SOACHA" ${
				args.ciudad === "SOACHA" ? "selected" : ""
			}>SOACHA</option>
			<option value="SOGAMOSO" ${
				args.ciudad === "SOGAMOSO" ? "selected" : ""
			}>SOGAMOSO</option>
			<option value="SOLEDAD" ${
				args.ciudad === "SOLEDAD" ? "selected" : ""
			}>SOLEDAD</option>
			<option value="TAME" ${args.ciudad === "TAME" ? "selected" : ""}>TAME</option>
			<option value="TIBÚ" ${args.ciudad === "TIBÚ" ? "selected" : ""}>TIBÚ</option>
			<option value="TIERRALTA" ${
				args.ciudad === "TIERRALTA" ? "selected" : ""
			}>TIERRALTA</option>
			<option value="TOCANCIPÁ" ${
				args.ciudad === "TOCANCIPÁ" ? "selected" : ""
			}>TOCANCIPÁ</option>
			<option value="TUCHÍN" ${
				args.ciudad === "TUCHÍN" ? "selected" : ""
			}>TUCHÍN</option>
			<option value="TULUÁ" ${
				args.ciudad === "TULUÁ" ? "selected" : ""
			}>TULUÁ</option>
			<option value="TUMACO" ${
				args.ciudad === "TUMACO" ? "selected" : ""
			}>TUMACO</option>
			<option value="TUNJA" ${
				args.ciudad === "TUNJA" ? "selected" : ""
			}>TUNJA</option>
			<option value="TURBACO" ${
				args.ciudad === "TURBACO" ? "selected" : ""
			}>TURBACO</option>
			<option value="TURBO" ${
				args.ciudad === "TURBO" ? "selected" : ""
			}>TURBO</option>
			<option value="UBATÉ" ${
				args.ciudad === "UBATÉ" ? "selected" : ""
			}>UBATÉ</option>
			<option value="URIBIA" ${
				args.ciudad === "URIBIA" ? "selected" : ""
			}>URIBIA</option>
			<option value="VALLEDUPAR" ${
				args.ciudad === "VALLEDUPAR" ? "selected" : ""
			}>VALLEDUPAR</option>
			<option value="VILLA" ${
				args.ciudad === "VILLA" ? "selected" : ""
			}>VILLA</option>
			<option value="VILLAMARÍA" ${
				args.ciudad === "VILLAMARÍA" ? "selected" : ""
			}>VILLAMARÍA</option>
			<option value="VILLAVICENCIO" ${
				args.ciudad === "VILLAVICENCIO" ? "selected" : ""
			}>VILLAVICENCIO</option>
			<option value="YOPAL" ${
				args.ciudad === "YOPAL" ? "selected" : ""
			}>YOPAL</option>
			<option value="YUMBO" ${
				args.ciudad === "YUMBO" ? "selected" : ""
			}>YUMBO</option>
			<option value="ZIPAQUIRÁ" ${
				args.ciudad === "ZIPAQUIRÁ" ? "selected" : ""
			}>ZIPAQUIRÁ</option>
			<option value="ZONA BANANERA" ${
				args.ciudad === "ZONA BANANERA" ? "selected" : ""
			}>ZONA BANANERA</option>
		</select>`;
	},
	info_form: (args) => {
		return `<form onsubmit='submit_vh_data' class='baldosas_container'>
			${
				typeof args === "undefined"
					? `<div>
				<div class='card_text'>Numero de chasis</div>
				<div><input class='campo_text' type='text' ref='new_vin' label='Chasis' placeholder='Ingresar el numero de chasis'></div>
			</div>`
					: ``
			}
			<div>
				<div class='card_text'>Placa</div>
				${
					typeof args === "object"
						? `<div class='card_text placa' style='font-size: 15pt !important;'>${
								args.placa
							}${args.chasis ? ` - ${args.chasis}` : ""}</div>`
						: `<input class='campo_text' type='text' ref='new_placa' placeholder='Ingrese la placa' label='Placa' />`
				}
			</div>
			<div>
				<div class='card_text'>Marca</div>
				${
					typeof args === "object"
						? `<div>${Views.menu_marcas(args)}</div>`
						: `<div>${Views.menu_marcas({
								marca: "",
								ref: "new_marca",
							})}</div>`
				}
			</div>
			<div>
				<div class='card_text'>Nombre</div>
				${
					typeof args === "object"
						? `<div><input class='campo_text' type="text" value='${
								args.descripcion || ""
							}' label='Nombre'></div>`
						: `<div><input class='campo_text' type='text' ref='new_nombre' placeholder='Ingrese el nombre del vehiculo' label='Nombre'></div>`
				}
			</div>
			<div>
				<div class='card_text'>Color</div>
				${
					typeof args === "object"
						? `<div><input class='campo_text' type="text" value='${
								args.colorin || ""
							}' label='Color'></div>`
						: `<div><input class='campo_text' type='text' ref='new_colorin' placeholder='Ingrese el color del vehiculo' label='Color'></div>`
				}
			</div>
			<div>
				<div class='card_text'>Kilometraje</div>
				<div><input class='campo_text' type="text" ref='${
					typeof args === "object" ? "km" : "new_km"
				}' value='' placeholder='Definir kilometraje' onkeyup='set_km' label='Kilometraje'></div>
			</div>
			<div>
				<div class='card_text'>Ciudad</div>
				${
					typeof args === "object"
						? `<div>${Views.menu_ciudades({
								ciudad: args.ciudad,
								ref: "ciudad",
							})}</div>`
						: `<div>${Views.menu_ciudades({
								ciudad: "",
								ref: "new_ciudad",
							})}</div>`
				}
			</div>
			<div>
				<h3 class='card_text'>Cilindrada</h3>
				<div><input class='campo_text' type="text" ref='${
					typeof args === "object" ? "cc" : "new_cc"
				}' value='' placeholder='Definir cilindrada' label='Cilindrada'></div>
			</div>
			<div>
				<div class='card_text'>Version</div>
				${
					typeof args === "object"
						? `<div><input class='campo_text' type="text" value='${
								args.modelo_ano || ""
							}' label='Version'></div>`
						: `<div><input class='campo_text' type='text' ref='new_modelo_ano' placeholder='Ingrese el ano del vehiculo' label='Version'></div>`
				}
				
			</div>
			<div>
				<div class='card_text'>Precio</div>
				<div><input class='campo_text' type="text" ref='${
					typeof args === "object" ? "precio" : "new_precio"
				}' label='Precio' onkeyup='set_precio'></div>
			</div>
			<div>
				<div class='card_text'>Descuento</div>
				<div>
					<input class='campo_text' type="text" ref='${
						typeof args === "object" ? "descuento" : "new_descuento"
					}' label='Descuento' onkeyup='apply_descuento'>
					<div ref='${
						typeof args === "object"
							? "descuento_print"
							: "new_descuento_print"
					}'></div>
				</div>
			</div>
			<div>
				<div class='card_text'>Tipo de caja</div>
				<div>
					<select class='campo_text' ref='${
						typeof args === "object" ? "tipo_caja" : "new_tipo_caja"
					}' label='Tipo de caja'>
						<option value="">Sin definir</option>
						<option value="manual">Manual</option>
						<option value="automatico">AutomÃ¡tico</option>
					</select>
				</div>
			</div>
			<div>
				<div class='card_text'>Tipo de vehiculo</div>
				<div>
					<select class='campo_text' ref='${
						typeof args === "object" ? "tipo_vh" : "new_tipo_vh"
					}' label='Tipo de vehiculo'>
						<option value="">Sin definir</option>
						<option value="automovil">Automovil</option>
						<option value="camioneta">Camioneta</option>
						<option value="electrico">Electrico</option>
						<option value="pickup">Pick-up</option>
						<option value="utilitarios">Utilitarios</option>
					</select>
				</div>
			</div>
			<div>
				<div class='card_text'>Tipo de combustible</div>
				<div>
					<select class='campo_text' ref='${
						typeof args === "object"
							? "tipo_combustible"
							: "new_tipo_combustible"
					}' label='Tipp de combustible'>
						<option value="">Sin definir</option>
						<option value="gasolina">Gasolina</option>
						<option value="diesel">Diesel</option>
						<option value="electrico">Eléctrico</option>
						<option value="hibrido">Híbrido</option>
					</select>
				</div>
			</div>
			<div>
				<div class='card_text'>Es vehiculo destacado?</div>
				<div>
					<select class='campo_text' ref='${
						typeof args === "object"
							? "desctacado"
							: "new_desctacado"
					}' label='Destacado'>
						<option value="no">No</option>
						<option value="si">Si</option>
					</select>
				</div>
			</div>
			<div>
				<div class='card_text'>Inventario</div>
				<div>
					<select class='campo_text' ref='${
						typeof args === "object" ? "stock" : "new_stock"
					}' label='Inventario'>
						<option value="disponible">En venta</option>
						<option value="vendido">Vendido</option>
					</select>
				</div>
			</div>
			<div>
				<div class='card_text'>Estado</div>
				<div>
					<select class='campo_text' ref='${
						typeof args === "object" ? "status" : "new_status"
					}' label='Estado'>
						<option value="activo">Activo</option>
						<option value="inactivo">Inactivo</option>
					</select>
				</div>
			</div>
			<div>
				<div class='card_text'>DescripciÃ³n:</div>
				<div><textarea class='campo_text' ref='${
					typeof args === "object" ? "descripcion" : "new_descripcion"
				}' label='Descripcion'></textarea></div>
			</div>
			<div>
				<input type="submit" value="Guardar" class='app_btn' />
			</div>
		</form>
		<div ref="save_info_loader" style="display:none; background-color:#00000090; position: fixed; width:100%; height: 100%; left: 0; top: 0"><div class="loader"></div></div>`;
	},
	vh_image: (args) => {
		return `<div>
			<div class='card_text'>${args.title}</div>
		</div>
		<div>
			<div ref='bgimg' style="border: 0;
			position: relative;
			padding: 0;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			height: 323px;
			background-image: url('${args.key}');
			border: 2px #494747 solid">
				${Views.default_toggler(args)}
				<button onclick="click_remove_picture" class='remove_btn'>Eliminar</button>
				<button onclick="click_take_picture" class='camera_btn'></button>
			</div>
		</div>`;
	},
	default_toggler: (args) => {
		return `<div>
			${
				args.cover
					? `<div style="padding: 1px 20px;
			background-color: #FFFFFF90;
			backdrop-filter: blur(3px);
			margin: 0 0 0 auto;
			width: 200px;
			text-align: center;
			border-radius: 5px;">
				<h4 style='margin: 5px; color: #444;'>Esta imagen esta como portada</h4>
			</div>`
					: ""
			}
		</div>`;
	},
};

function Root(root) {
	return typeof root === "string" ? document.querySelector(root) : root;
}

function Render(props) {
	const { bbox, view, args, actions } = props;
	bbox.innerHTML = view(args);
	const buffer = {
		refs: {},
	};
	return new Promise((resolve) => {
		const nodes = bbox.querySelectorAll("*");
		for (let node of nodes) {
			const attrs = node.attributes;
			for (let attr of attrs) {
				const name = attr.name;
				const value = attr.value;
				let event = name.match(/on[a-z|0-9|A-Z]+/g);
				if (Array.isArray(event)) {
					if (event.length > 0) {
						if (typeof actions[value] === "function") {
							node[name] = (ev) => {
								if (ev.preventDefault) ev.preventDefault();
								actions[value]({ ev, node, info: buffer });
							};
						}
					}
				} else if (name.toLowerCase() === "ref") {
					buffer.refs[value] = node;
					node.removeAttribute(name);
				}
			}
		}
		resolve(buffer);
	});
}

function Api(cmd = "", json = {}, headers = {}) {
	return new Promise((resolve) => {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", `${api}?cmd=${cmd}`);
		Object.keys(headers).forEach((k) => {
			const v = headers[k];
			json[k] = v;
		});
		xhr.onreadystatechange = function (aEvt) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					json_resp = xhr.responseText;
					resolve(JSON.parse(json_resp));
				}
			}
		};

		// enviamos la solicitud
		xhr.send(JSON.stringify(json));
	});
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
			function (err, data) {},
		);
	};
	const upload_presigned = (cmd, key, data, evs = {}) => {
		if (!isB64(data.body.file))
			return { then: () => console.log("file is not base64") };
		return new Promise((resolve, reject) => {
			data.body.key = key;
			const body = {};
			for (let p in data.body) {
				body[p] = data.body[p];
			}
			delete body.file;
			Api(cmd, body, {
				firma: localStorage.getItem("firma"),
				mulpartname: data.body.real_name,
				mulparttype: data.body.type,
			}).then((data_resp) => {
				if (typeof evs.onPresigned === "function") {
					evs.onPresigned(data_resp);
				}
				if (data_resp.error) {
					return;
				}
				const signature = data_resp.signature;
				const signed_url = signature.url;
				if (!signed_url) return;

				const form_data = new FormData();
				for (let key in signature.fields) {
					form_data.append(key, signature.fields[key]);
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
						error:
							parseInt(xhr.status) !== 204 &&
							parseInt(xhr.status) !== 200,
						type: "complete",
					});
				};
			});
		});
	};
	const ready = (cback) => {
		if (typeof cback === "function") cback(_public);
		return _public;
	};
	const _public = {
		list: list,
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

function resize_image(base64, props = {}) {
	props.max_w = props.max_w || 1200;
	props.max_h = props.max_h || 900;

	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		//canvas.setAttribute("width", props.max_w);
		//canvas.setAttribute("height", props.max_h);
		const context = canvas.getContext("2d");
		const image = new Image();
		image.src = base64;
		image.onload = () => {
			const w = image.naturalWidth;
			const h = image.naturalHeight;
			let new_w = props.max_w;
			let new_h = props.max_h;
			if (w < props.max_w && h < props.max_h) {
				new_w = w;
				new_h = h;
			}else{
				const diffw = Math.max(w, props.max_w) - Math.min(w, props.max_w);
				const diffh = Math.max(h, props.max_h) - Math.min(h, props.max_h);
				const perc_w = diffw / w;
				const perc_h = diffh / h;
				let offset_w = 0;
				let offset_h = 0;
				let new_w = props.max_w;
				let new_h = props.max_h;
				if (diffw >= diffh) {
					offset_h = props.max_h * perc_h;
					new_h = props.max_h - offset_h;
				} else {
					offset_w = props.max_w * perc_w;
					new_w = props.max_w - offset_w;
				}
			}
			canvas.setAttribute("width", new_w);
			canvas.setAttribute("height", new_h);
			context.drawImage(image, 0, 0, new_w, new_h);
			resolve(canvas.toDataURL("image/jpeg", 0.7));		
		};

	});
}
