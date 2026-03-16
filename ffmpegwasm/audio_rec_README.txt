Antes de usar el contenido de la carpeta "audio_rec":
-----------------------------------------------------------
1. Copiar o subir la carpeta "audio_rec" a/en la carpeta donde quiere ejecutar el código.
2. Puede ejecutar el index.html de la carpeta "audio_rec" para probar el código.
3. Esta es la última de la ejecuión del código y puede copiarse donde quiere usar el recorder:
INICIO DE CODE:
-------
// OPCIONAL
const audio_script = document.createElement("script");
audio_script.type = "module";
audio_script.src = `./audio_rec/audio_recorder.js?${Date.now()}`;
audio_script.onload = () => {
    // IMPORTANTE
    const audio_rec1 = new AudioRecorder({
        root: "id_del_div_contenedor",
        onStartRecord: () => {
        },
        onRecorded: (resp) => {
            const {b64, blob} = resp;
            audio_rec1.send("url_end_point", 
            {
                blob: blob,
                name: "audio_test.mp3",
            }).then(resolve => {
            }).catch(error => {
            });
        },
        onAborted: () => {
        }
    });
};
--------------------------
FIN DE CODE
