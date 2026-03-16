function Menu_Opciones_Editable(props){
    const root = typeof props.root === "string" ? document.querySelector(props.root) : props.root;
    const input = typeof props.input === "string" ? document.querySelector(props.input) : props.input;
    const styles = `<style>
        #${root.id} > div {
            border-radius: 0 0 20px 20px;
            margin-top: -12px;
            padding: 5px;
        }
        #${root.id} > div > button {
            border: 0;
            width: 100%;
            display:none;
            font-size: 16pt;
            color: #777; 
            cursor: pointer; 
            padding: 5px;
            margin-bottom:5px;
            background-color: #EFEFEF;
        }
        #${root.id} > div > button:hover {
            background-color: #EEE; 
        }
    </style>`;
    root.innerHTML = `${styles}<div>
        ${props.list.map(item => {
            return `<button k='${item.name}' class="${root.id}-options">${item.label}</button>`;
        }).join('')}
    </div>`;
    root.style.display = "none";
    const options = document.getElementsByClassName(`${root.id}-options`);
    for(let item of options){
        item.onclick = ev =>{
            const k = ev.target.getAttribute("k");
            const label = ev.target.innerText;
            root.style.display = "none";
            input.value = label;
            if(typeof props.onClick === "function")
                props.onClick(k);
        } 
    }
    if(input){
        input.onkeyup = ev => {
            const value = input.value;
            _public.filter(value);
        }    
    }
    
    const _public = {
        filter: text => {
            const split = text.split(" ");
            const options = document.getElementsByClassName(`${root.id}-options`);
            const buffer = [];
            root.style.display = "none";
            /*if(text.trim().replace(/\s/g, "") === ""){
                root.style.display = "none";
            }else{
                root.style.display = "block";
            }*/
            split.forEach(item =>{
                for(let option of options){
                    option.style.display = "none";
                    if(option.innerText.toLowerCase().trim().includes(item.toLowerCase().trim())){
                        buffer.push(option);
                    }
                }
            });
            for(let option of buffer){
                root.style.display = "block";
                option.style.display = "block";
            }
        }
    };
    return _public;
}