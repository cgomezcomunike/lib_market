// VARS AND CONSTANTS
const _root_data = {};
const _CV_URL = "https://sz7kvxahsl.execute-api.us-east-1.amazonaws.com/default/CRM-tools-socket_alive";

function Api(url, cmd = "", json = {}, headers = {}) {
	return new Promise((resolve) => {
		if (typeof url !== "string") return;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", `${url}?accion=${cmd}`);
		for (const k in headers) {
			xhr.setRequestHeader(k, headers[k]);
		}
		xhr.onreadystatechange = function (aEvt) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					const json_resp = xhr.responseText;
					resolve(JSON.parse(json_resp));
				}
			}
		};
		xhr.send(JSON.stringify(json));
	});
}

function CMNKSocket(props) {
	let _socket;
	const run = () => {
		if (typeof props.url === "undefined")
			return console.log("No wss url!");
		if (!props.url.includes("wss://"))
			return console.error("No wss protocol!");
		_socket = new WebSocket(props.url);
		_socket.addEventListener("open", (event) => open(event));
		_socket.addEventListener("close", (event) => close(event));
		_socket.addEventListener("message", (event) => getting(event));
		_socket.addEventListener("error", (event) => error(event));
		return __public;
	};
	const open = (event) => {
		if (typeof props.onConnect === "function") props.onConnect(event);
	};
	const close = (event) => {
		if (typeof props.onClose === "function") props.onClose(event);
	};
	const getting = (event) => {
		if (typeof props.onGet === "function") props.onGet(event);
	};
	const error = (event) => {
		if (typeof props.onError === "function") props.onError(event);
	};
	const __public = {
		run,
		socket: () => _socket,
		send: (data) => {
			if (!_socket) return;
			_socket.send(data);
		},
	};
	return __public;
}

function url_vars() {
	const buffer = {};
	const url = window.location.href;
	const split = url.split("?");
	const vars = split[1];
	if (typeof vars === "undefined") return [];
	let vars_split = vars.split("&");
	vars_split = vars_split.length > 0 ? vars_split : [vars[0]];
	for (const var_ of vars_split) {
		const var_split = var_.split("=");
		buffer[var_split[0]] = var_split[1];
	}
	return buffer;
}


function check_firma() {
	const firma = localStorage.getItem("firma");
	if (
		typeof firma === "undefined" ||
		firma.trim().replace(/\s/g, "") === "" ||
		firma === null
	) {
		console.error("No hay sockets!!");
		return false;
	}
	return true;
}

(() => {
	if (!check_firma()) return;

	const vars = url_vars();
	_root_data.user = localStorage.getItem("user");
	_root_data.cv = localStorage.getItem("dominio");
	_root_data.firma = localStorage.getItem("firma");
	_root_data.cel = localStorage.getItem("celular");

	//CHECK IF SOME OF THESE VARIABLES EXIST
	for (const k in _root_data) {
		if (typeof _root_data[k] === "undefined") {
			console.error(`Property ${k} is not defined`);
			return;
		}
	}

	//DO THE INITIAL VALIDATION TO GET THE TOKEN
	Api(_CV_URL, "", {
		cel: _root_data.cel,
		asesor_user: _root_data.user,
		asesor_firma: _root_data.firma,
	}, {}).then(resp => {
		if (resp.error) {
			return;
		}
		_root_data.token = resp.token;
		_root_data.wsurl = resp.ws_url;
		start_ws_connection();
	});
})();

function start_ws_connection() {
	const socket = new CMNKSocket({
		url: _root_data.wsurl,
		onConnect: ws_connect,
		onError: ws_error,
		onClose: ws_disconnect,
		onGet: (ev) => {
			if (typeof ev.data === "undefined") return;
			try {
				const data = JSON.parse(ev.data);
				const my_reaction = data.my_reaction;
				if (typeof my_reaction === "string" && typeof my_reactions[my_reaction] === "function") {
					my_reactions[my_reaction](data);
				}
				const their_reaction = data.their_reaction;
				if (typeof their_reaction === "string" && typeof their_reactions[their_reaction] === "function") {
					their_reactions[their_reaction](data);
				}
			} catch (err) {
				console.error(`No data received! - ${err}`)
			}
		}
	}).run();
	render.main();
	_root_data.socket = socket.socket();
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function ws_connect({socket, ev}) {
	actions.start_chat();
}
function ws_disconnect({socket, ev}) {}
function ws_error({socket, ev}) {}

const actions = {
	start_chat: () => {
		_root_data.socket.send(
			JSON.stringify({
				accion: "chat/Start_chat",
				user: _root_data.user,
				cv: _root_data.cv,
				firma: _root_data.firma,
				token: _root_data.token,
			}),
		);
	},
	send_message: (props = {}) => {
		if (typeof props.to === "undefined") return;
		_root_data.socket.send(
			JSON.stringify({
				accion: "chat/Send_message",
				user: _root_data.user,
				cv: _root_data.cv,
				firma: _root_data.firma,
				token: _root_data.token,
				to: props.to,
				message: props.message
			}),
		);
	},
	send_beep: (props = {}) => {
		if (typeof props.to === "undefined") return;
		_root_data.socket.send(
			JSON.stringify({
				accion: "chat/Send_message",
				user: _root_data.user,
				cv: _root_data.cv,
				firma: _root_data.firma,
				token: _root_data.token,
				to: props.to,
				message: props.message
			}),
		);
	}
}
const my_reactions = {
	start_chat_react: (data) => {
		console.log(1212, data);
		render.users_alive(data.users_alive);
	}
}
const their_reactions = {
	start_chat_react: (data) => {
		console.log(1212, data);
	},
	message_1p1: (data) => {
		if (data.message === "beep") {
			const beep = document.querySelector("#chatAudio");
			beep.play();
			return;
		}
		console.log(43434, data);
		render.input_messages(data);
	}
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
const events = {
	select_user_btn: () => {
		const btns = document.querySelectorAll(".users_btn");
		for (const btn of btns) {
			btn.onclick = () => {
				const key = btn.getAttribute("key");
				render.messages({to: key});
			}
		}
	},
	send_message_form: (props) => {
		const form = document.querySelector("#send_message_form");
		const send_beep = document.querySelector("#send_beep");
		form.onsubmit = (ev) => {
			ev.preventDefault();
			const message_text = document.querySelector("#message_text");
			if (message_text.value.trim() === "") return;
			actions.send_message({
				to: props.to,
				message: message_text.value.trim()
			});
		}
		send_beep.onclick = () => {
			actions.send_beep({
				to: props.to,
				message: "beep"
			});
		}
	}
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const render = {
	main: (data) => {
		const app = document.querySelector("#app");
		const main_template = document.querySelector("template[name='main_view']");
		if (typeof main_template === "undefined") return;
		app.innerHTML = main_template.innerHTML.replace(/{%user%}/g, `<h3>${_root_data.user}</h3>`);
	},
	users_alive: (data) => {
		const users_alive = document.querySelector("#users_alive");
		users_alive.innerHTML = `${data.map((item) => {
			if (item.trim() === _root_data.user) return;
			return `<div>
				<button key="${item}" class="users_btn">${item}</button>
			</div>`;
		}).join("")
			}`;
		events.select_user_btn();
	},
	messages: (data) => {
		const template = document.querySelector("template[name='messages']");
		const chat_body = document.querySelector("#chat_body");
		chat_body.innerHTML = template.innerHTML.replace(/{%user_to%}/g, data.to);
		events.send_message_form({to: data.to});
	},
	input_messages: (data) => {
		const input_messages = document.querySelector("#input_messages");
		const current = input_messages.innerHTML;
		input_messages.innerHTML = `${current}<div>${data.message}</div>`
	}
}
