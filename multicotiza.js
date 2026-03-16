function Multicotizador(props) {
	const _bbox = typeof props.bbox === "string" ? document.getElementById(props.bbox) : props.bbox;
	if (!_bbox) return;
	const _db = props.cotiza_data.lista;
	const _financieras = props.financieras;

	function anti_money(v) {
		return v.replace(/[\,|\.|\$]/g, "");
	}
	function money(v, n, x) {
		var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\," : "$") + ")";
		const val = parseInt(v).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&.");
		return "$" + val;
	}

	const isJSON = text => {
		try {
			JSON.parse(text);
		} catch (e) {
			return false;
		}
		return true;
	};

	const pass = (...args) => {
		const json = {};
		for (let arg in args) {
			json[arg] = args[arg];
		}
		return JSON.stringify(json);
	};

	function Dom(parent, actions) {
		const available = ["div", "a", "button", "input", "form", "select", "textarea"];
		const nodes = parent.querySelectorAll("*");
		const els = [];
		const buffer = [];
		for (let n of nodes) {
			if (!available.includes(n.tagName.toLowerCase())) continue;
			const attrs = [];
			for (let a of n.attributes) attrs.push(a);
			for (let a of attrs) {
				const name = a.name;
				const value = a.value;
				const events = name.match(/on+[a-z|A-Z]+\s*=*/g);
				const args = value.match(/\(?.*\)?/g);
				let params = args.length > 1 ? args[0].replace(/[\w|W]+\(+/g, "") : "";
				params = params.substr(0, params.length - 1);
				let is_json = isJSON(params);
				params = is_json ? JSON.parse(params) : undefined;
				if (events) {
					buffer.push({
						parent,
						actions,
						node: n,
						event: name,
						value,
						params,
						is_json,
					});
					n.removeAttribute(name);
					n[name] = ev => {
						const action_name = is_json ? value.substr(0, value.indexOf("(")) : value;
						if (ev.preventDefault) ev.preventDefault();
						if (typeof actions === "object")
							if (typeof actions[action_name] === "function")
								actions[action_name]({
									this: n,
									ev,
									args: params,
								});
					};
				}
				if (name.toLowerCase().trim() === "id") {
					els[value] = n;
				}
			}
		}
		return { els };
	}

	function Separator(bbox, initial, final) {
		if (initial) {
			const init = document.createElement("div");
			init.setAttribute("class", "start_flow_line");
			bbox.appendChild(init);
		}
		const line = document.createElement("div");
		line.setAttribute("class", "flow_line");
		bbox.appendChild(line);
		if (final) {
			const end = document.createElement("div");
			end.setAttribute("class", "end_flow_line");
			bbox.appendChild(end);
		}
	}

	function Flow_control(props2) {
		const __bbox = typeof props2.bbox === "string" ? document.getElementById(props2.bbox) : props2.bbox;
		if (!__bbox) return;

		let __comp;
		const __token = props2.token;
		let __comps = [];
		let __els = [];

		const states = {
			lock: false,
			edit: false,
		};

		const run = () => {
			if (!__comp) __bbox.appendChild(views.create_comp());
			else __comp.innerHTML = views.main();
			const dom = new Dom(__comp, actions);
			__els = dom.els;
			if (!__comps.familias) actions.add_familias();
			/*if(!__comps.versiones)
				actions.add_versiones();*/
			/*if(!__comps.accesorios)
				actions.add_accesorios();*/
			/*if(!__comps.financieras)
				actions.add_financieras();*/
		};

		const actions = {
			add_familias: args => {
				__comps.familias = new Familias({
					bbox: `${_bbox.id}_${__token}_cotiza_flow`,
					onSelect: actions.select_familia,
					onReset: actions.reset_familia,
				});
				__comps.familias.run();
			},
			add_versiones: args => {
				const hide = (args || {}).hide;
				delete args.hide;
				__comps.versiones = new Versiones({
					bbox: `${_bbox.id}_${__token}_cotiza_flow`,
					familia: args.familia,
					component: (__comps.versiones || { get_comp: () => undefined }).get_comp() || undefined,
					hide: typeof hide === "undefined" || hide === null ? true : hide,
					onSelect: actions.select_version,
					onReset: actions.reset_version,
					onMessage: props2.onMessage,
				});
				__comps.versiones.run();
			},
			add_accesorios: args => {
				const hide = (args || {}).hide;
				__comps.accesorios = new Accesorios({
					bbox: `${_bbox.id}_${__token}_cotiza_flow`,
					data: args.data,
					index: (__comps.accesorios || { get_token: () => undefined }).get_token() || undefined,
					hide: typeof hide === "undefined" || hide === null ? true : hide,
					component: (__comps.accesorios || { get_comp: () => undefined }).get_comp() || undefined,
					onActivate: actions.activate_accesorios,
					onNext: actions.activate_financieras,
				});
				__comps.accesorios.run();
				__comps.accesorios.set_num_vhs(__comps.versiones.get_num_vhs());
			},
			add_financieras: args => {
				const hide = (args || {}).hide;
				__comps.financieras = new Financieras({
					bbox: `${_bbox.id}_${__token}_cotiza_flow`,
					data: args.data,
					financieras: _financieras,
					index:
						(
							__comps.financieras || {
								get_token: () => undefined,
							}
						).get_token() || undefined,
					hide: typeof hide === "undefined" || hide === null ? true : hide,
					precio: (args || {}).precio || undefined,
					cantidad: (args || {}).cantidad || 1,
					component: (__comps.financieras || { get_comp: () => undefined }).get_comp() || undefined,
					onActivate: actions.activate_financieras,
				});
				__comps.financieras.run();
			},
			select_familia: args => {
				actions.add_versiones({ familia: args, hide: false });
				__comps.familias.toggle_flow_line(true);
				__els[`${_bbox.id}_${__token}_clear_btn`].style.display = "initial";
				if (__comps.accesorios) __comps.accesorios.show();
				if (__comps.financieras) __comps.financieras.opaque();
			},
			select_version: args => {
				let finance_data = [];
				let acces_data = [];
				if (__comps.financieras) finance_data = __comps.financieras.get_data();
				if (__comps.accesorios) acces_data = __comps.accesorios.get_data();
				actions.add_accesorios({ hide: false, data: acces_data });
				actions.add_financieras({
					precio: args.precio,
					cantidad: args.cantidad,
					hide: false,
					data: finance_data,
				});
				__els[`${_bbox.id}_${__token}_save_btn`].style.display = "initial";
				if (__comps.accesorios) __comps.accesorios.show();
				if (__comps.financieras) __comps.financieras.opaque();
			},
			activate_accesorios: () => {
				if (__comps.financieras) __comps.financieras.lock(true);
			},
			activate_financieras: () => {
				__comps.accesorios.set_num_vhs(__comps.versiones.get_num_vhs());
				const acce_total = __comps.accesorios.get_total();
				__comps.financieras.set_accesorios_total(acce_total);
				__comps.accesorios.lock(true);
			},
			reset_familia: () => {
				__comps.familias.toggle_flow_line(false);
				__els[`${_bbox.id}_${__token}_clear_btn`].style.display = "none";
				actions.add_versiones({ hide: true, familia: undefined });
				if (__comps.accesorios) __comps.accesorios.hide();
				if (__comps.financieras) __comps.financieras.hide();
				__els[`${_bbox.id}_${__token}_save_btn`].style.display = "none";
			},
			reset_version: () => {
				if (__comps.accesorios) __comps.accesorios.hide();
				if (__comps.financieras) __comps.financieras.hide();
			},
			cancel_flow: args => {
				__comps = [];
				run();
			},
			save_flow: args => {
				const finance = __comps.financieras;
				if (finance.get_data().length === 0) {
					if (!confirm("Desea proseguir sin agregar al menos una financiación?")) {
						return;
					}
				}
				if (!finance.saved()) {
					if (!confirm("Desea proseguir sin agregar la financiación temporal?")) {
						return;
					}
				}
				states.lock = true;
				run();
				if (typeof props2.onSave === "function")
					props2.onSave({
						token: __token,
						comp: __els[`${_bbox.id}_${__token}_flow`],
						edit: states.edit,
					});
			},
			remove: () => {
				if (typeof props2.onRemove === "function") props2.onRemove({ token: __token, comp: __comp });
			},
			edit_flow: () => {
				states.lock = false;
				states.edit = true;
				run();
				__comps.familias.edit(`${_bbox.id}_${__token}_cotiza_flow`);
				__comps.versiones.edit(`${_bbox.id}_${__token}_cotiza_flow`);
				__comps.accesorios.edit(`${_bbox.id}_${__token}_cotiza_flow`);
				__comps.financieras.edit(`${_bbox.id}_${__token}_cotiza_flow`);
				__els[`${_bbox.id}_${__token}_save_btn`].style.display = "initial";
			},
		};

		const views = {
			create_comp: () => {
				__comp = document.createElement("div");
				__comp.id = `${__bbox.id}_${__token}_flow`;
				__comp.setAttribute("class", "flows");
				__comp.innerHTML = views.main();
				return __comp;
			},
			main: () => {
				return `${
					!states.lock
						? `
						<div id='${_bbox.id}_${__token}_cotiza_flow'></div>
						<div class='cotiza_tools'>
							<button id='${_bbox.id}_${__token}_clear_btn' onclick='cancel_flow' style='display: none'></button>
							<button id='${_bbox.id}_${__token}_save_btn' onclick='save_flow' style='display: none'></button>
						</div>`
						: `${views.show_locked_info()}`
				}`;
			},
			show_locked_info: () => {
				const familia_data = __comps.familias.get_data();
				const version_data = __comps.versiones.get_data();
				const accesorios_data = __comps.accesorios.get_data();
				const financieras_data = __comps.financieras.get_data();
				let accesorios_total = 0;
				for (let a of accesorios_data) accesorios_total += parseFloat(a.precio);
				return `<div class='cotizacion_terminada'>
					<button onclick='edit_flow'>
						<div>${familia_data.familia.familia}</div>
						<div>${version_data.version.nombre} | ${money(version_data.precio)}</div>
						<div>Accesorios x${accesorios_data.length} | ${money(accesorios_total)}</div>
						<div>Financieras x${financieras_data.length}</div>
					</button>
					<button onclick='remove'></button>
				</div>`;
			},
		};

		const _public = {
			run,
			finished: () => {
				return states.lock;
			},
			get_data: () => {
				return {
					familia: __comps.familias.get_data(),
					version: __comps.versiones.get_data(),
					accesorios: __comps.accesorios.get_data(),
					financieras: __comps.financieras.get_data(),
				};
			},
			remove: actions.remove,
		};
		return _public;
	}

	function Familias(props2) {
		let __bbox = typeof props2.bbox === "string" ? document.getElementById(props2.bbox) : props2.bbox;
		if (!__bbox) return;

		let __comp;
		let __buffer = [];
		let __els = [];

		const run = () => {
			if (!__comp) {
				__bbox.appendChild(views.create_comp());
				Separator(__bbox, true, true);
				actions.toggle_flow_line(false);
			} else __comp.innerHTML = views.main();
			const dom = new Dom(__comp, actions);
			__els = dom.els;
		};

		const actions = {
			select_familia: args => {
				__buffer.familia = args.args.familia;
				__buffer.index = args.args.index;
				actions.clear_comp();
				run();
				if (typeof props2.onSelect === "function") props2.onSelect(__buffer);
			},
			clear_comp: () => {
				__comp.innerHTML = "";
			},
			reset_familia: () => {
				__buffer = [];
				actions.clear_comp();
				run();
				if (typeof props2.onReset === "function") props2.onReset();
			},
			toggle_flow_line: (v = true) => {
				if (typeof __comp === "undefined" || __comp === null) return;
				const start = __comp.nextSibling;
				const line = start.nextSibling;
				const end = line.nextSibling;
				start.style.display = `${v ? "block" : "none"}`;
				line.style.display = `${v ? "block" : "none"}`;
				end.style.display = `${v ? "block" : "none"}`;
			},
		};

		const views = {
			create_comp: args => {
				__comp = document.createElement("div");
				__comp.setAttribute("class", "flow_block familias");
				__comp.innerHTML = `${views.main()}`;
				return __comp;
			},
			main: args => {
				return `<div>
					Familia ${
						__buffer.familia
							? `| <button class='reset_steps_btns' onclick='reset_familia'>${__buffer.familia.familia}</button>`
							: ""
					}
				</div>
				${__buffer.familia ? "" : `<div class='familias_btns'>${views.families_list()}`}</div>`;
			},
			families_list: () => {
				return `${_db
					.map((v, i) => {
						return `<button onclick='select_familia(${JSON.stringify({ familia: v, index: i })})'>${
							v.familia
						}</button>`;
					})
					.join("")}`;
			},
			flow_line: () => {
				return `<div><div class='flow_line'></div></div>`;
			},
		};

		const _public = {
			run,
			get_data: () => {
				return __buffer;
			},
			edit: bbox => {
				__bbox = typeof bbox === "string" ? document.getElementById(bbox) : bbox;
				if (!__bbox) return;
				__comp = null;
				run();
				actions.toggle_flow_line(true);
			},
			toggle_flow_line: actions.toggle_flow_line,
		};
		return _public;
	}

	function Versiones(props2) {
		let __bbox = typeof props2.bbox === "string" ? document.getElementById(props2.bbox) : props2.bbox;
		if (!__bbox) return;

		let __comp = props2.component;
		let __buffer = [];
		let __els = [];

		__buffer.cantidad = 1;
		__buffer.obs = "";
		__buffer.tipo = "particular";

		const states = {
			filled_form: false,
			precio_min_issue: false,
			hide: props2.hide || false,
		};

		const run = () => {
			if (!__comp) {
				__bbox.appendChild(views.create_comp());
				Separator(__bbox, false, true);
			} else {
				__comp.innerHTML = views.main();
			}
			const separator_line = __comp.nextSibling;
			const separator_end = separator_line.nextSibling;
			separator_line.style.display = states.hide ? "none" : "block";
			separator_end.style.display = states.hide ? "none" : "block";
			__comp.style.display = states.hide ? "none" : "block";
			const dom = new Dom(__bbox, actions);
			__els = dom.els;
			states.precio_min_issue = false;
		};

		const actions = {
			select_precio: args => {
				let value = anti_money(args.this.value);
				if (value.trim() === "" || isNaN(value)) {
					value = "";
					args.this.value = value;
					__buffer.precio = 0;
					return;
				}
				__buffer.precio = value;
				args.this.value = money(value);
			},
			blur_precio: args => {
				let value = anti_money(args.this.value);
				value = Math.max(parseInt(value), parseInt(__buffer.minimo)).toString();
				if (value.trim() === "" || isNaN(value)) {
					value = "";
					args.this.value = value;
					__buffer.precio = 0;
					return;
				}
				__buffer.precio = value;
				args.this.value = money(value);
			},
			select_preversion: args => {
				__buffer.version = args.args[0].version;
				__buffer.precio = __buffer.version.precio;
				__buffer.cantidad = __buffer.cantidad || 1;
				__buffer.index = __buffer.version.index;
				__buffer.modano = __buffer.version.modano;
				__buffer.plantilla = __buffer.version.plantilla;
				__buffer.minimo = __buffer.version.minimo;
				__buffer.maximo = __buffer.version.maximo;
				__buffer.obs = __buffer.obs || "";
				__buffer.tipo = __buffer.tipo || "particular";
				actions.clear_comp();
				run();
			},
			select_version: args => {
				states.precio_min_issue = true;
				//__buffer.obs = document.getElementById(`${_bbox.id}_vh_obs`).value || "";
				const minimo = __buffer.version.minimo || __buffer.version.precio;
				if (__buffer.precio < minimo) {
					__buffer.precio = Math.max(minimo, __buffer.precio);
					__buffer.precio_moneda = money(__buffer.precio);
					states.precio_min_issue = true;
					if (typeof props2.onMessage === "function")
						props2.onMessage({
							type: "info",
							class: "error",
							message:
								(props.mensajes || {}).error_precio_min ||
								"El precio del Vehículo debe ser mayor o igual al precio mí­nimo.",
						});
					run();
					return;
				}
				states.filled_form = true;
				actions.clear_comp();
				run();
				if (typeof props2.onSelect === "function") props2.onSelect(__buffer);
			},
			select_cantidad: args => {
				let value = args.this.value.replace(
					/[a-z|A-Z|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\=|\+|\[|\]|\{|\}|\;|\:|\'|\"|\,|\<|\>|\/|\\|\?|\n|\s|\t|\r]/g,
					""
				);
				args.this.value = value;
				__buffer.cantidad = parseInt(value.trim() === "" ? 1 : value);
				const total = document.getElementById(`${_bbox.id}_total_vh`);
				total.innerHTML = money(__buffer.precio * __buffer.cantidad);
			},
			select_obs: args => {
				__buffer.obs = args.this.value;
			},
			clear_comp: () => {
				__comp.innerHTML = "";
			},
			reset_version: () => {
				states.hide = false;
				states.filled_form = false;
				//__buffer = [];
				for (const k in __buffer) {
					if (k === "cantidad" || k === "obs") continue;
					delete __buffer[k];
				}
				actions.clear_comp();
				run();
				//__buffer.cantidad = 1;
				if (typeof props2.onReset === "function") props2.onReset();
			},
			select_tipo: args => {
				__buffer.tipo = args.this.value;
			},
			click_edit: args => {
				states.hide = false;
				states.filled_form = false;
				run();
			},
		};

		const views = {
			create_comp: () => {
				__comp = document.createElement("div");
				__comp.setAttribute("class", "flow_block versiones");
				__comp.innerHTML = views.main();
				return __comp;
			},
			main: () => {
				return `<div>
					<button onclick='click_edit'>Versión</button> ${
						!props2.familia
							? ""
							: __buffer.version
								? `| <button class='reset_steps_btns' onclick='reset_version'>${__buffer.cantidad} (${
										__buffer.version.nombre
									})${
										__buffer.precio
											? ` x ${money(__buffer.precio)} = ${money(
													__buffer.precio * __buffer.cantidad
												)}`
											: ""
									}</button>${views.show_precio()}`
								: ""
					}
				</div>
				${props2.familia ? (__buffer.version ? "" : `<div class='versiones_btns'>${views.versiones_list()}</div>`) : ""}`;
			},
			versiones_list: () => {
				return `${
					!props2.familia
						? ``
						: `${props2.familia.familia.vh
								.map((v, i) => {
									if (v.estado === "0") return "";
									return `<button onclick='select_preversion(${pass({
										version: v,
										index: i,
									})})'><div>${v.nombre}</div><div>${money(v.precio)}</div></button>`;
								})
								.join("")}`
				}`;
			},
			show_precio: () => {
				return `${
					states.filled_form
						? ""
						: `<form onsubmit='select_version'>
					<div>Precio:
						<input type='text' value='${money(__buffer.precio)}'  onkeyup='select_precio' onblur='blur_precio'/>
					</div>
					<div>Cantidad:
						<input type='text' onkeyup='select_cantidad' value='${__buffer.cantidad || 1}' />
					</div>
					<div>Tipo de vehí­culo:
						<select onchange='select_tipo'>
							<option value='particular' ${__buffer.tipo === "particular" ? "selected" : ""}>Particular</option>
							<option value='publico' ${__buffer.tipo === "publico" ? "selected" : ""}>Público</option>
						</select>
					</div>
					<div>Observaciones: <br><textarea class='campo_text' value='${__buffer.obs || ""}' id='${
						_bbox.id
					}_vh_obs' onkeyup="select_obs">${__buffer.obs || ""}</textarea></div>
					<div>Total: <span id='${_bbox.id}_total_vh'>${money(__buffer.precio * (__buffer.cantidad || 1))}</span></div>
					<input type='submit' value='Guardar versión' />
					<div>${states.precio_min_issue ? "El precio asignado es inferior al precio mínimo" : ""}</div>
				</form>`
				}`;
			},
		};

		const _public = {
			run,
			get_comp: () => {
				return __comp;
			},
			get_data: () => {
				return __buffer;
			},
			edit: bbox => {
				__bbox = typeof bbox === "string" ? document.getElementById(bbox) : bbox;
				if (!__bbox) return;
				__comp = null;
				run();
			},
			get_num_vhs: () => __buffer.cantidad,
		};
		return _public;
	}

	function Accesorios(props2) {
		let __bbox = typeof props2.bbox === "string" ? document.getElementById(props2.bbox) : props2.bbox;
		if (!__bbox) return;

		const __token = props2.index || Math.ceil(Math.random() * Date.now());
		let __comp = props2.component;
		let __els = [];
		let __vh_count = 1;

		const states = {
			state: true,
			num: 0,
			total: 0,
			hide: props2.hide || false,
		};

		const run = () => {
			if (__buffer.length === 0) {
				actions.add_accesorio();
			}
			if (!__comp) {
				__bbox.appendChild(views.create_comp());
				Separator(__bbox, false, true);
				__comp.style.opacity = "1";
			} else {
				__comp.innerHTML = views.main();
			}
			let dom = new Dom(__comp, actions);
			__els = dom.els;
			__comp.style.display = `${states.hide ? "none" : "block"}`;
			const separator_line = __comp.nextSibling;
			const separator_end = separator_line.nextSibling;
			separator_line.style.display = states.hide ? "none" : "block";
			separator_end.style.display = states.hide ? "none" : "block";
		};

		const actions = {
			codify_data: buffer => {
				const new_buffer = [];
				for (const item of buffer) {
					new_buffer.push({
						token: Math.ceil(Math.random() * Date.now()),
						name: item.nombre,
						price: parseInt(item.precio_individual),
						tipo: item.tipo,
					});
					states.total += parseInt(item.precio_individual);
				}
				// new_buffer.pus({
				// 	token: Math.ceil(Math.random() * Date.now()),
				// 	name: "",
				// 	price: "",
				// 	tipo: "",
				// });
				return new_buffer;
			},
			add_accesorio: args => {
				if (__buffer.length >= 1) {
					const a = __buffer[__buffer.length - 1];
					let req_str = "";
					if (a.name.trim() === "") {
						req_str += "- Nombre de accesorio\n";
					}
					if (a.price.trim() === "") {
						req_str += "- Precio de accesorio\n";
					}
					if (a.tipo.trim() === "") {
						req_str += "- Tipo de accesorio\n";
					}
					if (req_str.trim().replace(/\s/g, "") !== "") {
						alert(`Antes de agregar un nuevo accesorio, ingrese los campos faltantes:\n${req_str}`);
						return;
					}
				}
				const token = Math.ceil(Math.random() * Date.now());
				__buffer.push({
					token,
					name: "",
					price: "",
					tipo: "",
				});
				actions.calculate_totals();
				if (args) {
					run();
					const names = document.getElementsByClassName(`${_bbox.id}_${__token}_accesorios_name`);
					names[names.length - 1].focus();
				}
			},
			hide: () => {
				states.hide = true;
				run();
			},
			lock: (remove_comp = true) => {
				states.state = false;
				if (remove_comp) props2.component = undefined;
				actions.clear_comp();
				__comp.style.opacity = "0.5";
				run();
			},
			clear_comp: () => {
				__comp.innerHTML = "";
			},
			activate: () => {
				states.state = true;
				states.hide = false;
				actions.clear_comp();
				run();
				if (typeof props2.onActivate === "function") props2.onActivate();
				__comp.style.opacity = "1";
			},
			change_name: args => {
				__buffer[args.args].name = args.this.value;
			},
			select_tipo: args => {
				__buffer[args.args].tipo = args.this.value;
			},
			change_price: args => {
				let value = anti_money(args.this.value);
				if (value.trim() === "" || isNaN(value)) {
					value = "";
					args.this.value = value;
					__buffer[args.args].price = 0;
					return;
				}
				__buffer[args.args].price = value;
				args.this.value = money(value);
			},
			blur_price: args => {
				actions.calculate_totals();
				//actions.add_accesorio(args);
			},
			remove: args => {
				if (__buffer.length === 1) {
					__buffer[0] = { name: "", price: "" };
					actions.clear_comp();
					actions.calculate_totals();
					run();
					return;
				}
				const new_buffer = [];
				for (let b in __buffer) {
					if (parseInt(b) === parseInt(args.args)) continue;
					new_buffer.push(__buffer[b]);
				}
				__buffer = new_buffer;
				actions.calculate_totals();
				run();
			},
			calculate_totals: () => {
				states.total = 0;
				states.num = 0;
				for (let a of __buffer) {
					if (a.price.trim() === "") continue;
					states.num++;
					states.total += parseFloat(a.price);
				}
				states.total = states.total * (__vh_count || 1);
			},
			finish_accesorios: () => {
				if (typeof props2.onNext === "function") props2.onNext();
			},
		};
		let __buffer = actions.codify_data(props2.data) || [];

		const views = {
			create_comp: () => {
				__comp = document.createElement("div");
				__comp.setAttribute("class", "flow_block accesorios");
				__comp.style.opacity = "0.5";
				__comp.innerHTML = views.main();
				return __comp;
			},
			main: () => {
					// ${states.num} Accesorio${states.num === 1 ? "" : "s"} | Total: ${money(states.total)}
				return `<div ${!states.state ? `onclick='activate'` : ""}>
					${__buffer.length} Accesorio${__buffer.length === 1 ? "" : "s"} | Total: ${money(states.total)}
					${
						states.state && !states.hide
							? `
					<div>
						<div id='${_bbox.id}_${__token}_accesorios' class='accesorio_field'>
							${__buffer
								.map((v, i) => {
									return `${views.accesorio({
										token: v.token,
										name: v.name,
										price: v.price,
										index: i,
										tipo: v.tipo,
									})}`;
								})
								.join("")}
						</div>
						<div>
							<button onclick='add_accesorio'>Agregar Accesorio</button>
							<button onclick='finish_accesorios'>Siguiente</button>
						</div>
					</div>
					`
							: ""
					}
				</div>`;
			},
			accesorio: args => {
				return `<div>
					<input type='text' value='${args.name}' placeholder='Nombre' onkeyup='change_name(${args.index})' class='${
						_bbox.id
					}_${__token}_accesorios_name' />
					<br><select onchange='select_tipo(${args.index})'>
						<option disabled selected>Seleccione el tipo...</option>
						<option value='carroceria' ${args.tipo === "carroceria" ? "selected" : ""}>Carrocería</option>
						<option value='accesorio' ${args.tipo === "accesorio" ? "selected" : ""}> Accesorio</option>
						<option value='transformacion' ${args.tipo === "transformacion" ? "selected" : ""}>Transformación</option>
					</select>
					<br><input type='text' value='${
						args.price.toString().trim() === "" ? "" : money(args.price)
					}' placeholder='Precio' onkeyup='change_price(${args.index})' onblur='blur_price'/>
					<button onclick='remove(${args.index})'>Eliminar</button>
				</div>`;
			},
		};

		const _public = {
			run,
			get_token: () => {
				return __token;
			},
			get_comp: () => {
				return __comp;
			},
			hide: () => {
				actions.hide();
			},
			lock: remove_comp => {
				actions.lock(remove_comp);
			},
			show: _ => {
				__comp.style.opacity = "1";
			},
			get_data: () => {
				const data = [];
				for (let b of __buffer) {
					if (b.name.trim() === "" || b.price.toString().trim() === "") continue;
					data.push({
						nombre: b.name,
						precio: b.price * (__vh_count || 1),
						precio_moneda: money(b.price * (__vh_count || 1)),
						precio_individual: b.price,
						precio_individual_moneda: money(b.price),
						tipo: b.tipo,
					});
				}
				return data;
			},
			get_data2: () => {
				const data = [];
				for (let b of __buffer) {
					if (b.name.trim() === "" || b.price.toString().trim() === "") continue;
					data.push({
						nombre: b.name,
						precio: b.price,
						precio_moneda: money(b.price),
						tipo: b.tipo,
					});
				}
				return data;
			},
			get_total: () => {
				const data = _public.get_data2();
				let total = 0;
				for (let a of data) {
					const price = parseInt(a.precio);
					total += price;
				}
				return total * (__vh_count || 1);
			},
			set_num_vhs: num => (__vh_count = num),
			edit: bbox => {
				__bbox = typeof bbox === "string" ? document.getElementById(bbox) : bbox;
				if (!__bbox) return;
				__comp = null;
				run();
				__comp.style.opacity = "1";
			},
		};
		return _public;
	}

	function Financieras(props2) {
		let __bbox = typeof props2.bbox === "string" ? document.getElementById(props2.bbox) : props2.bbox;
		if (!__bbox) return;

		const __token = props2.index || Math.ceil(Math.random() * Date.now());
		let __comp = props2.component;
		let __els = [];

		let __buffer = props2.data || [];
		let __temp_calcula = {};

		let __saved = true;

		let __acce_total = 0;

		const states = {
			hide: props2.hide || false,
			state: false,
			num: 0,
		};

		const run = () => {
			if (!__comp) {
				__bbox.appendChild(views.create_comp());
				Separator(__bbox, false, true);
			} else __comp.innerHTML = views.main();
			const dom = new Dom(__comp, actions);
			__els = dom.els;
			__comp.style.display = `${states.hide ? "none" : "block"}`;
			const separator_line = __comp.nextSibling;
			const separator_end = separator_line.nextSibling;
			separator_line.style.display = `${states.hide ? "none" : "block"}`;
			separator_end.style.display = `${states.hide ? "none" : "block"}`;
		};

		const actions = {
			activate: () => {
				states.state = true;
				states.hide = false;
				actions.clear_comp();
				run();
				if (typeof props2.onActivate === "function") props2.onActivate();
				__comp.style.opacity = "1";
			},
			clear_comp: () => {
				__comp.innerHTML = "";
			},
			lock: (remove_comp = true) => {
				states.state = false;
				if (remove_comp) props2.component = undefined;
				actions.clear_comp();
				__comp.style.opacity = "0.5";
				run();
			},
			hide: () => {
				states.hide = true;
				run();
			},
			select_cuota_ini: args => {
				let value = anti_money(args.this.value);
				if (value.trim() === "" || isNaN(value)) {
					value = "";
					args.this.value = "";
					__temp_calcula.cuota_ini = 0;
					return;
				}
				__temp_calcula.cuota_ini = value;
				args.this.value = money(value);
				actions.calcula_cuota_mensual();
				__saved = false;
			},
			set_cuota_mensual: args => {
				let value = anti_money(args.this.value);
				if (value.trim() === "" || isNaN(value)) {
					value = "";
					args.this.value = "";
					__temp_calcula.cuota_mensual = 0;
					return;
				}
				__temp_calcula.cuota_mensual = value;
				args.this.value = money(value);
				__saved = false;
			},
			set_financia_notas: args => {
				__temp_calcula.notas = args.this.value;
				__saved = false;
			},
			select_plazo: args => {
				const plazos_btn = document.getElementsByClassName(`${_bbox.id}_${__token}_plazos_btn`);
				for (let btn of plazos_btn) {
					btn.classList.remove("plazo_selected");
				}
				args.this.classList.add("plazo_selected");
				__temp_calcula.plazo = args.args[0] * 12;
				if (typeof __temp_calcula.tasa === "undefined") return;
				actions.calcula_cuota_mensual();
				__saved = false;
			},
			select_tasa: args => {
				const tasa_btn = document.getElementsByClassName(`${_bbox.id}_${__token}_temperatura_btns`);
				for (let btn of tasa_btn) {
					btn.classList.remove("tasa_selected");
				}
				args.this.classList.add("tasa_selected");
				__temp_calcula.tasa = args.args[0].value;
				if (typeof __temp_calcula.plazo === "undefined") return;
				actions.calcula_cuota_mensual();
				__saved = false;
			},
			calcula_cuota_mensual: () => {
				if (__temp_calcula.cuota_ini && __temp_calcula.plazo) {
					const interes = parseFloat(__temp_calcula.tasa) / 100;
					const plazo = parseInt(__temp_calcula.plazo);
					const precio = parseInt(props2.precio) * props2.cantidad;
					if (interes === 0) {
						__temp_calcula.cuota_mensual = precio;
						const cuota_mensual = __els[`${_bbox.id}_${__token}_cuota_mensual`];
						cuota_mensual.setAttribute("placeholder", money(__temp_calcula.cuota_mensual));
						return;
					}
					const cuotaPORinteres = (precio + __acce_total - __temp_calcula.cuota_ini) * interes;
					__temp_calcula.cuota_mensual =
						(cuotaPORinteres * Math.pow(1 + interes, plazo)) / (Math.pow(1 + interes, plazo) - 1);
					//__temp_calcula.cuota_mensual = ((precio + __acce_total - __temp_calcula.cuota_ini) * parseFloat(__temp_calcula.tasa)) / __temp_calcula.plazo;
					const cuota_mensual = __els[`${_bbox.id}_${__token}_cuota_mensual`];
					cuota_mensual.setAttribute("placeholder", money(__temp_calcula.cuota_mensual));
				}
			},
			select_financiera: args => {
				__temp_calcula.financiera = args.this.value;
				__saved = false;
			},
			get_financia: token => {
				for (let f in __buffer) {
					if (__buffer[f].token === token) return f;
				}
				return -1;
			},
			save: args => {
				const cuota_mensual = __els[`${_bbox.id}_${__token}_cuota_mensual`];
				if (cuota_mensual.value.trim() === "") {
					alert("Ingresar la cuota mensual");
					return;
				}
				if (args.args[0]) {
					const pos = actions.get_financia(args.args[0]);
					__buffer[pos] = {
						token: args.args[0],
						cuota_ini: __temp_calcula.cuota_ini,
						plazo: __temp_calcula.plazo,
						tasa: __temp_calcula.tasa,
						cuota_mensual:
							cuota_mensual.value.trim() === "" ? __temp_calcula.cuota_mensual : cuota_mensual.value,
						financiera: __temp_calcula.financiera,
						notas: __temp_calcula.notas,
					};
				} else {
					const financia = {
						token: Math.ceil(Math.random() * Date.now()),
						cuota_ini: __temp_calcula.cuota_ini,
						plazo: __temp_calcula.plazo,
						tasa: __temp_calcula.tasa,
						cuota_mensual:
							cuota_mensual.value.trim() === "" ? __temp_calcula.cuota_mensual : cuota_mensual.value,
						financiera: __temp_calcula.financiera,
						notas: __temp_calcula.notas,
					};
					__buffer.push(financia);
				}
				__temp_calcula = [];
				states.num = __buffer.length;
				__saved = true;
				run();
			},
			edit_financia: args => {
				__saved = false;
				const financia = args.args[0];
				__temp_calcula = {
					token: financia.token,
					cuota_ini: financia.cuota_ini,
					cuota_mensual: financia.cuota_mensual,
					plazo: financia.plazo,
					tasa: financia.tasa,
					financiera: financia.financiera,
					notas: financia.notas,
				};
				states.num = __buffer.length;
				run();
			},
			remove_financia: args => {
				const token = args.args[0];
				const new_buffer = [];
				for (let b of __buffer) {
					if (b.token === token) continue;
					new_buffer.push(b);
				}
				__buffer = new_buffer;
				actions.clear_comp();
				states.num = __buffer.length;
				run();
			},
			reset: () => {
				__saved = true;
				__temp_calcula = [];
				run();
			},
		};

		const views = {
			create_comp: () => {
				__comp = document.createElement("div");
				__comp.setAttribute("class", "flow_block financieras");
				__comp.style.opacity = "0.5";
				__comp.innerHTML = views.main();
				return __comp;
			},
			main: () => {
				const precio = parseInt(props2.precio) * props2.cantidad;
				return `<div ${!states.state ? `onclick='activate'` : ""}>
					<div>Precio del vehículo + accesorios = ${money(precio + __acce_total)}</div>
					${__buffer.length} Financiera${__buffer.length === 1 ? "" : "s"}
					${
						states.state && !states.hide
							? `<div id='${_bbox.id}_${__token}_financieras' class='financieras_group'>
							${__buffer
								.map((v, i) => {
									return `<div>
									<button onclick='edit_financia(${pass(v)})'>${v.financiera} | ${v.cuota_mensual}</button>
									<button onclick='remove_financia(${pass(v.token)})'>Eliminar</button>
								</div>`;
								})
								.join("")}
						</div>
						<form onsubmit='save(${pass(__temp_calcula.token)})' onreset='reset'>
							<div>
								<select onchange='select_financiera'>
									<option disabled ${!__temp_calcula.financiera ? "selected" : ""}>Seleccionar financiera...</option>
									${props2.financieras
										.map((v, i) => {
											return `<option value='${v.name}' ${
												__temp_calcula.financiera === v.name ? "selected" : ""
											}>${v.name}</option>`;
										})
										.join("")}
								</select>
							</div>
							<div>
								<input type='text' id='${_bbox.id}_${__token}_cuota_ini' ${
									__temp_calcula.cuota_ini
										? `value='${
												__temp_calcula.cuota_ini.trim() === ""
													? ""
													: money(__temp_calcula.cuota_ini)
											}'`
										: ""
								} placeholder='Cuota inicial' onkeyup='select_cuota_ini' />
							</div>
							<div>
								<p>Plazo:</p>
								${[1, 2, 3, 4, 5, 6, 7]
									.map((v, i) => {
										return `<button onclick='select_plazo(${pass(v, i)})' class='${
											_bbox.id
										}_${__token}_plazos_btn ${
											__temp_calcula.plazo === v * 12 ? "plazo_selected" : ""
										}'>${v * 12}</button>`;
									})
									.join("")}
							</div>
							<div>
								<p>Tasa:</p>
								<div>
									${[
										{ name: "2.5", value: `${2.5}` },
										{ name: "2.25", value: `${2.25}` },
										{ name: "2.0", value: `${2}` },
										{ name: "1.75", value: `${1.75}` },
										{ name: "1.5", value: `${1.5}` },
										{ name: "1.25", value: `${1.25}` },
										{ name: "1.0", value: `${1}` },
										{ name: "0", value: `${0}` },
									]
										.map(v => {
											return `<button value='${v.value}' onclick='select_tasa(${pass(
												v
											)})' style='display:inline-block;' class='${
												_bbox.id
											}_${__token}_temperatura_btns ${
												__temp_calcula.tasa === v.value ? "tasa_selected" : ""
											}'>${v.name}</button>`;
										})
										.join("")}
								</div>
							</div>
							<div>
								<input type='text' id='${_bbox.id}_${__token}_cuota_mensual' placeholder='${
									__temp_calcula.cuota_mensual ? __temp_calcula.cuota_mensual : "Cuota mensual"
								}' value='${
									__temp_calcula.cuota_mensual ? __temp_calcula.cuota_mensual : ""
								}' onkeyup='set_cuota_mensual' required />
							</div>
							<div><textarea id='${
								_bbox.id
							}_${__token}_txt_obs' class="campo_text" placeholder="Observaciones" onkeyup="set_financia_notas">${
								__temp_calcula.notas ? __temp_calcula.notas : ""
							}</textarea></div>
							<div>
								<input type='reset' value='Borrar datos' />
								<input type='submit' value='Agregar financiación' id='${_bbox.id}_${__token}_add_finance' />
							</div>
						</form>`
							: ``
					}
				</div>`;
			},
		};

		const _public = {
			run,
			get_token: () => {
				return __token;
			},
			get_comp: () => {
				return __comp;
			},
			saved: () => {
				return __saved;
			},
			hide: () => {
				actions.hide();
			},
			lock: remove_comp => {
				actions.lock(remove_comp);
			},
			opaque: () => {
				__comp.style.opacity = "0.5";
			},
			set_accesorios_total: total => {
				__acce_total = total;
				states.state = true;
				states.hide = false;
				__comp.style.opacity = "1";
				actions.clear_comp();
				actions.reset();
			},
			get_data: () => {
				const data = [];
				for (let b of __buffer) {
					data.push({
						cuota_ini: b.cuota_ini,
						cuota_ini_moneda: money(b.cuota_ini),
						plazo: b.plazo,
						tasa: b.tasa,
						cuota_mensual: anti_money(b.cuota_mensual),
						cuota_mensual_moneda: b.cuota_mensual,
						financiera: b.financiera,
						notas: b.notas,
					});
				}
				return data;
			},
			edit: bbox => {
				__bbox = typeof bbox === "string" ? document.getElementById(bbox) : bbox;
				if (!__bbox) return;
				__comp = null;
				run();
				__comp.style.opacity = "1";
			},
		};
		return _public;
	}

	let _flows = [];
	let _els = [];
	let _messages = [];

	const run = () => {
		_bbox.innerHTML = views.main();
		const dom = new Dom(_bbox, actions);
		_els = dom.els;
		actions.add_flow();
		return _public;
	};

	const actions = {
		close_app: args => {
			const buffer = [];
			let exist = false;
			for (let i in _flows) {
				const f = _flows[i];
				if (f.finished()) {
					buffer.push(f.get_data());
					if (typeof props.onClose === "function") props.onClose({ cotizaciones: buffer, error: false });
					_bbox.style.display = "none";
					exist = true;
				}
			}
			if (exist) return;
			actions.add_message({
				class: "alerta",
				message: (props.mensajes || {}).confirma_salida || "¿Desea salir sin terminar al menos una cotización?",
				cancel: "cancelar_salida",
				accept: "aceptar_salida",
			});
		},
		add_flow: data => {
			const token = Math.ceil(Math.random() * Date.now());
			const flow = new Flow_control({
				bbox: `${_bbox.id}_canvas`,
				token,
				onSave: actions.save_flow,
				onRemove: actions.remove_flow,
				onMessage: actions.add_message,
			});
			_flows[`flow_${token}`] = flow;
			flow.run();
		},
		save_flow: args => {
			if (!args.edit) actions.add_flow();
		},
		remove_flow: args => {
			delete _flows[`flow_${args.token}`];
			_els[`${_bbox.id}_canvas`].removeChild(args.comp);
		},
		add_message: args => {
			if (!args.accept) {
				args.accept = "cancelar_salida";
			}
			const div = document.createElement("div");
			div.setAttribute("class", `mensajes_cont`);
			div.innerHTML = views[args.type || "confirm"](args);
			_els[`${_bbox.id}_modal_messages`].appendChild(div);
			new Dom(_els[`${_bbox.id}_modal_messages`], actions);
		},
		cancelar_salida: () => {
			_els[`${_bbox.id}_modal_messages`].innerHTML = "";
			_messages = [];
		},
		aceptar_salida: () => {
			_els[`${_bbox.id}_modal_messages`].innerHTML = "";
			_bbox.style.display = "none";
			if (typeof props.onClose === "function")
				props.onClose({
					cotizaciones: [],
					error: true,
					message: "Finalizar al menos una cotización.",
				});
			_messages = [];
		},
		reset: () => {
			for (let f in _flows) {
				const flow = _flows[f];
				if (typeof flow.remove === "function") flow.remove();
			}
			_flows = [];
			run();
			if (typeof props.onReset === "function") props.onReset();
		},
	};

	const views = {
		main: () => {
			return `<div class='${_bbox.id}_main'>
				<div class='${_bbox.id}_header'>
					<button onclick='close_app'></button>
					<h1>Cotización de Vehí­culos</h1>
				</div>
				<div id='${_bbox.id}_canvas' class='${_bbox.id}_canvas'></div>
				<div id='${_bbox.id}_modal_messages' class='modal_messages'></div>
			</div>`;
		},
		info: args => {
			return `<div class='messages_group${args.class ? ` ${args.class}` : ""}'>
				<div>${args.message}</div>
				<div>
					<button onclick='${args.accept}'>Aceptar</button>
				</div>
			</div>`;
		},
		confirm: args => {
			return `<div class='messages_group${args.class ? ` ${args.class}` : ""}'>
				<div>${args.message}</div>
				<div>
					<button onclick='${args.cancel}'>Cancelar</button>
					<button onclick='${args.accept}'>Aceptar</button>
				</div>
			</div>`;
		},
	};

	const _public = {
		run,
		reset: actions.reset,
		money: v => {
			return money(v);
		},
		anti_money: v => {
			return anti_money(v);
		},
	};
	return _public;
}
