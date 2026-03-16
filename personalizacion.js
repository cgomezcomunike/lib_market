function Semaforo(props) {
	const sel_colors = document.querySelector(props.selector_main);
	const sel_steps = document.querySelector(props.selector_pasos);

	const start = () => {
		if (sel_colors.innerHTML !== "") {
			sel_colors.innerHTML = "";
		}
		bind_colors();
		bind_steps("none");
		events();
	};
	const bind_colors = () => {
		let colors = `<option value="">Seleccione</option>`;
		for(const k1 in props.source){
			const item = props.source[k1];
			colors += `<option value='${k1}'>${item.tag}</option>`;
		}
		sel_colors.innerHTML = colors;
	};
	const bind_steps = (color) => {
		const data_color = props.source[color] || {};
		let steps = `<option value="">Seleccione</option>`;
		for(const step of data_color.pasos || []){
			steps += `<option value='${step}'>${step}</option>`;
		}
		sel_steps.innerHTML = steps;
	}
	const events = () =>{
		sel_colors.onchange = () =>{
			const color = sel_colors.value;
			bind_steps(color);
		}
	}

	start();
}
