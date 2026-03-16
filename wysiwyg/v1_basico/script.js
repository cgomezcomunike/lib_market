// Seleccionamos todos los botones de la barra de herramientas
const buttons = document.querySelectorAll('.toolbar button');

// Seleccionamos el área del editor
const editor = document.getElementById('editor');

// Añadimos un event listener a cada botón
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtenemos el comando del atributo 'data-command'
        const command = button.dataset.command;

        // Verificamos si el comando existe antes de ejecutarlo
        if (command) {
            // El tercer argumento (value) no es necesario para estos comandos
            document.execCommand(command, false, null);
        }

        // Devolvemos el foco al editor para que el usuario pueda seguir escribiendo
        editor.focus();
    });
});

/**
 * Nota sobre document.execCommand():
 * Este método está oficialmente obsoleto en los estándares web, pero sigue
 * siendo soportado por todos los navegadores modernos y es la forma más
 * sencilla de crear un editor básico como este. Alternativas más modernas
 * (como la API Input Events Level 2) son más potentes pero también mucho
 * más complejas de implementar. Para un proyecto sencillo o de aprendizaje,
 * execCommand sigue siendo una excelente opción.
 */