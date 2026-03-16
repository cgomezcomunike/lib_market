function PhotoProfile_Editor(args) {
    if (!args.bbox) return {};
    let bbox = typeof args.bbox === "string" ? document.getElementById(args.bbox) : args.bbox;
    let scale = 0;
    let scale_speed = 0.1;
    let irect = null;
    let _selected_file;

    bbox.innerHTML = `<div class='photo-editor-main'>
		<div id='foto_paso1' class='step1'>
			<div>
				<div>
					<img id='final_image' src='${args.img}' width='${args.maxw || 500}' height='${args.maxh || 330}' />
				</div>
				<button id='volver_toma' style='display:none' class='btns'>Cancelar</button>
				<!--button id='subir_imagen' class='btns'>Editar</button-->
				<form id='subidor_imagen_bbox'>
					<input type='file' id='subidor_imagen' style='display:none;' accept=".png, .jpeg, .jpg, .svg, .webp, .tiff, .pneg" />
					<input type='reset' id='reset_imagen' style='display: none;' />
				</form>
			</div>
		</div>
	<div id='foto_paso4' style='display:none' class='step4'>
			<div id='pretoma'>
				<div id='dragable_area' style='position: relative;
				width: ${args.maxw || 500}px;
				height: ${args.maxh || 330}px;
				overflow: hidden;
				background-color: #FFF;'>
					<img id='img_editable' style='position:absolute;left: 0px; transform-origin: center' draggable='false' />
					<div id='dragable_frame' style='position: absolute;
					background-position: center;
					z-index: 18;
					width: 100%;
					height: 100%;
					top: 0px;
					pointer-events: none;'></div>
				</div>
				<div style='text-align:center; margin-top: 30px'>
					<button id='zoomout_imagen' class='btns'>-</button>
					<button id='zoomin_imagen' class='btns'>+</button>
					<button id='ok_imagen' class='btns'>OK</button>
				</div>
				<img id='temporal' style='display:none' />
			</div>
			<div id='toma' style='display:none'>
				<img id='preview' />
				<div style='text-align:center;margin-top:30px;'>
					<button id='retomar_imagen' class='btns'>Nuevo intento</button>
					<button id='guardar_imagen' class='btns'>Guardar</button>
				</div>
			</div>
		</div>
	</div>`;

    function reset_input_file() {
        document.getElementById("reset_imagen").click();
    }

    function cargar_imagen(cback) {
        scale = 1;
        const input = document.getElementById(`subidor_imagen`);
        const img = document.getElementById("img_editable");
        img.style.display = "none";
        input.oncancel = ev => {
            if (ev.target.value.length === 0 || ev.target.files.length === 0) {
                if (typeof args.onCancel === "function") {
                    args.onCancel();
                }
            }
        };
        input.onchange = ev => {
            const file = ev.target.files[0];
            _selected_file = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                reset_input_file();
                cback(reader.result);
            };
        };
        input.onblur = ev => {
            if (typeof args.onCancel === "function") {
                args.onCancel();
            }
        };
    }

    function editar_image(b64) {
        document.getElementById("foto_paso1").style.display = "none";
        document.getElementById("foto_paso4").style.display = "block";
        const img = document.getElementById("img_editable");
        const parent = img.parentNode;
        const parent_rect = parent.getBoundingClientRect();
        const aux_img = new Image();
        aux_img.src = b64;
        aux_img.onload = () => {
            img.src = b64;
            img.onload = () => {
                img.style.display = "initial";
                img.style.transform = "scale(1.0)";
                if (aux_img.width >= aux_img.height) img.style.height = `${parent_rect.height + 100}px`;
                else img.style.width = `${parent_rect.width + 100}px`;
                pos.x = -(img.offsetWidth / 2) + parent_rect.width / 2;
                pos.y = -(img.offsetHeight / 2) + parent_rect.height / 2;
                img.style.left = `${-(img.offsetWidth / 2) + parent_rect.width / 2}px`;
                img.style.top = `${-(img.offsetHeight / 2) + parent_rect.height / 2}px`;
                scale = 1;
                irect = img.getBoundingClientRect();
            };
        };
    }

    const init_pos = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    function ini_drag(iv) {
        init_pos.x = iv.x - pos.x;
        init_pos.y = iv.y - pos.y;
        const img = document.getElementById("img_editable");
        const dragable_area = document.getElementById("dragable_area");
        img.style.transition = "none";

        const mover = v => {
            pos.x = v.x - init_pos.x;
            pos.y = v.y - init_pos.y;
            img.style.left = `${pos.x}px`;
            img.style.top = `${pos.y}px`;
            renderizartemp();
        };
        dragable_area.onmousemove = ev => {
            mover({ x: ev.x, y: ev.y });
        };
        dragable_area.ontouchmove = ev => {
            if (ev.touches.length < 1) return;
            const touch = ev.touches[0];
            mover({ x: touch.clientX, y: touch.clientY });
        };

        dragable_area.onmouseup = ev => {
            dragable_area.onmousemove = null;
            img.style.transition = "all 0.3s";
        };
        dragable_area.onmouseleave = ev => {
            dragable_area.onmousemove = null;
            img.style.transition = "all 0.3s";
        };
        dragable_area.ontouchend = ev => {
            dragable_area.ontouchmove = null;
            img.style.transition = "all 0.3s";
        };
    }

    function renderizar() {
        const source = document.getElementById("img_editable");
        const parent = source.parentNode;
        const source_rect = source.getBoundingClientRect();
        const parent_rect = parent.getBoundingClientRect();
        const canvas = document.createElement("canvas");
        canvas.style["border-radius"] = "100%";
        canvas.setAttribute("width", args.maxw || 500);
        canvas.setAttribute("height", args.maxh || 330);
        const c2d = canvas.getContext("2d");
        const pos1 = {
            x: source.offsetLeft + (source.offsetWidth / 2 - (source.offsetWidth / 2) * scale),
            y: source.offsetTop - 25 + (source.offsetHeight / 2 - (source.offsetHeight / 2) * scale),
        };
        c2d.drawImage(source, pos1.x, pos1.y, source.offsetWidth * scale, source.offsetHeight * scale);
        document.getElementById("preview").src = canvas.toDataURL("image/jpeg", 0.9);
    }

    function guardar() {
        const img = document.getElementById("preview");
        if (typeof args.enviar === "function") args.enviar(img.src, _selected_file);
        document.getElementById("foto_paso4").style.display = "none";
        document.getElementById("volver_toma").style.display = "none";
        document.getElementById("foto_paso1").style.display = "block";
        document.getElementById("pretoma").style.display = "block";
        document.getElementById("toma").style.display = "none";
        document.getElementById("final_image").src = img.src;
    }

    function escalar(v) {
        const img = document.getElementById("img_editable");
        scale += v;
        if (scale <= 0.3) scale = 0.3;
        img.style.transform = `scale(${scale})`;
        renderizartemp();
    }

    function renderizartemp() {
        return;
        const source = document.getElementById("img_editable");
        const parent = source.parentNode;
        const source_rect = source.getBoundingClientRect();
        const parent_rect = parent.getBoundingClientRect();
        const canvas = document.createElement("canvas");
        //canvas.style['border-radius'] = '100%';
        canvas.setAttribute("width", 300);
        canvas.setAttribute("height", 300);
        const c2d = canvas.getContext("2d");
        const pos1 = {
            x: source.offsetLeft + (source.offsetWidth / 2 - (source.offsetWidth / 2) * scale),
            y: source.offsetTop - 25 + (source.offsetHeight / 2 - (source.offsetHeight / 2) * scale),
        };
        c2d.drawImage(source, pos1.x, pos1.y, source.offsetWidth * scale, source.offsetHeight * scale);
        const temporal = document.getElementById("temporal");
        temporal.style.borderRadius = `100%`;
        temporal.src = canvas.toDataURL("image/jpg", 1);
    }

    function zoomout() {
        escalar(-scale_speed);
    }

    function zoomin() {
        escalar(scale_speed);
    }

    /*document.getElementById("subir_imagen").onclick = () => {
        document.getElementById(`subidor_imagen`).click();
    };*/
    document.getElementById("dragable_area").onmousedown = ev => {
        ini_drag({ x: ev.x, y: ev.y });
    };
    document.getElementById("dragable_area").ontouchstart = ev => {
        if (ev.touches.length < 1) return;
        const touch = ev.touches[0];
        ini_drag({ x: touch.clientX, y: touch.clientY });
    };
    document.getElementById("zoomout_imagen").onclick = () => {
        zoomout();
    };
    document.getElementById("zoomin_imagen").onclick = () => {
        zoomin();
    };
    document.getElementById("ok_imagen").onclick = () => {
        renderizar();
        //document.getElementById('pretoma').style.display = 'none';
        //document.getElementById('toma').style.display = 'block';
        guardar();
    };
    document.getElementById("retomar_imagen").onclick = () => {
        document.getElementById("foto_paso1").style.display = "block";
        document.getElementById("foto_paso4").style.display = "none";
        document.getElementById("pretoma").style.display = "block";
        document.getElementById("toma").style.display = "none";
        document.getElementById("volver_toma").style.display = "initial";
    };
    document.getElementById("volver_toma").onclick = () => {
        document.getElementById("pretoma").style.display = "none";
        document.getElementById("toma").style.display = "block";
        document.getElementById("foto_paso4").style.display = "block";
        document.getElementById("foto_paso1").style.display = "none";
    };
    document.getElementById("guardar_imagen").onclick = () => {
        guardar();
    };
    cargar_imagen(data => {
        editar_image(data);
    });

    if (args.startWith === "selectPhoto") {
        document.getElementById(`subidor_imagen`).click();
    }

    return {};
}
