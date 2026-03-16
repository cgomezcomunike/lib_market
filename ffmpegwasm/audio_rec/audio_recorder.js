import { fetchFile, toBlobURL } from './assets/util/package/dist/esm/index.js';
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
const _AUDIOREC_ICONS_ = {
    rec: `./audio_rec/icons/microphone.svg`,
    abort: `./audio_rec/icons/bin.svg`,
    send: `./audio_rec/icons/send.svg`,
    play: `./audio_rec/icons/play.svg`,
    pause: `./audio_rec/icons/pause.svg`,
    loading: `./audio_rec/icons/loader.svg`,
    sent: ``,
    wapp_sent: ``,
};
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const _AUDIOREC_STYLES_ = `<style>
    .rec_tools_bbox {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
    }
    .waveform_root {
        width: calc(100% - 176px);
        min-width: 100px;
        padding: 15px 20px !important;
        background-color: #222;
        border-radius: 100px;
        overflow: hidden;
    }
    .waveform_bbox {
        display: flex;
        justify-content: center;
        flex-direction: row;
        height: 10px;
        width: 100%;
        align-items: center;
    }
    .waveform_bar {
        background-color: #DDD;
        padding: 2px;
        margin: 2px;
        width: 3px;
        border-radius: 100px;
    }
    .audiorec_btn {
        background-color: transparent !important;
        width: 30px;
        height: 30px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border: 0;
    }
    .audiorec_loader {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 30px;
        height: 30px;
        background-image: url("${_AUDIOREC_ICONS_.loading}");
    }
    .audiorec_rec {
        opacity: 0.5;
        background-image: url("${_AUDIOREC_ICONS_.rec}");
    }
    .audiorec_rec:hover {
        opacity: 1;
    }
    .audiorec_abort {
        opacity: 0.5;
        background-image: url("${_AUDIOREC_ICONS_.abort}");
    }
    .audiorec_abort:hover {
        opacity: 1;
    }
    .audiorec_send {
        background-image: url("${_AUDIOREC_ICONS_.send}");
    }
    .audiorec_toggle {
    }
    .audiorec_play {
        background-image: url("${_AUDIOREC_ICONS_.play}");
    }
    .audiorec_pause {
        background-image: url("${_AUDIOREC_ICONS_.pause}");
    }
</style>`;

const _AUDIOREC_TEMPLATES_ = `
<template id="rec">
    <button id="{%id%}_btn_rec" class="audiorec_btn audiorec_rec"></button>
    <div id="{%id%}_audio_webm"></div>
    <div id="{%id%}_audio_mp3" style="display:none"></div>
    <div id="{%id%}_final_audio_mp3" style="display:none"></div>
</template>
<template id="rec_tools">
    <div class="rec_tools_bbox">
        <button id="{%id%}_btn_abort" class="audiorec_btn audiorec_abort"></button>
        <div id="{%id%}_waveform" class="waveform_root"></div>
        <button id="{%id%}_btn_toggle" class="audiorec_btn audiorec_toggle audiorec_pause"></button>
        <button id="{%id%}_btn_send" class="audiorec_btn audiorec_send"></button>
    </div>
</template>
<template id="audio_temp">
    <audio controls id="{%id%}_audio_control"></audio>
</template>`;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

async function Load_FFmpeg() {
    return new Promise((resolve) => {
        const wasm = document.createElement('script');
        wasm.src = './audio_rec/assets/ffmpeg/package/dist/umd/ffmpeg.js';
        wasm.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(wasm);
        wasm.onload = async (ev) => {
            const { FFmpeg } = FFmpegWASM;
            const ffmpeg = new FFmpeg();
            (async () => {
                const baseURL = "./audio_rec/assets";
                const baseURLWorker = "./audio_rec/assets";
                ffmpeg.on('log', ({ message }) => {
                    console.log(message);
                });
                // toBlobURL is used to bypass CORS issue, urls with the same
                // domain can be used directly.
                await ffmpeg.load({
                    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
                    workerURL: await toBlobURL(
                        `${baseURLWorker}/ffmpeg-core.worker.js`,
                        "text/javascript"
                    ),
                });
                resolve(ffmpeg);
            })();
        }
    })
}

function AudioConverter(props) {
    const { audio, ffmpeg } = props;

    const transcode = async () => {
        if (!ffmpeg) return;
        await ffmpeg.writeFile("input.webm", await fetchFile(audio));
        await ffmpeg.exec(["-i", "input.webm", "output.mp3"]);
        const data = await ffmpeg.readFile("output.mp3");
        return data;
    }

    const run = async () => {
        const blob = await transcode();
        return blob;
    }

    const __public = {
        run
    };
    return __public;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function WaveForm(props) {
    const { root, stream } = props;
    if (!root || !stream) return;

    const _max = root.clientWidth / 5.5 || 15;
    const wrapper = document.createElement("div");
    wrapper.classList.add("waveform_bbox");
    //root.style.width = `100px`;
    root.style.padding = "0 15px";
    root.appendChild(wrapper);
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;

    let _state = true;

    source.connect(analyser);

    const wave_buffer = [];
    const loop = window.setInterval(() => {
        if (!_state) return;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        const wave = {
            //value: dataArray[Math.floor(dataArray.length / 2)]
            value: dataArray[0]
        };
        wave.height = wave.value / 4;
        wave.bar = document.createElement("div");
        wave.bar.setAttribute("class", "waveform_bar");
        wave.bar.style.height = `${wave.height}px`;
        wave_buffer.push(wave);
        if (wave_buffer.length > _max) {
            wave_buffer.shift();
        }
        wrapper.innerHTML = "";
        for (let i = 0; i < wave_buffer.length; i++) {
            const bar = wave_buffer[i].bar;
            wrapper.appendChild(bar);
        }
    }, 100);
    const resume = () => {
        _state = true;
    }
    const pause = () => {
        _state = false;
    }
    const finish = () => {
        _state = false;
        clearInterval(loop);
    }
    const __public = {
        resume,
        pause,
        finish
    };
    return __public;
}

function Microphone(props) {
    let _media;
    let _abort = false;
    let audioChunks = [];
    let _recording_ev;
    const run = () => {
        _abort = false;
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then((stream) => {
                //const context = new AudioContext();
                //const source = context.createMediaStreamSource(stream);
                //const destination = context.createMediaStreamDestination();
                //const hz = props.hz || 16000;
                //const processor = context.createScriptProcessor(4096, 1, 1);
                //processor.onaudioprocess = (e) => {
                //    const inputbuffer = e.inputBuffer;
                //    const outputbuffer = e.outputBuffer;
                //    for (let i = 0; i < inputbuffer.numberOfChannels; i++) {
                //        const inputdata = inputbuffer.getChannelData(i);
                //        const outputdata = outputbuffer.getChannelData(i);
                //        for (let j = 0; j < outputbuffer.length; j++) {
                //            outputdata[j] = inputdata[Math.floor(i * inputbuffer.sampleRate / hz)] || 0;
                //        }
                //    }
                //}
                //source.connect(processor);
                //processor.connect(destination);
                //const processed_stream = destination.stream;
                const processed_stream = stream;

                let mimeType = 'audio/webm;codecs=opus';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'audio/mp4;codecs=mp4a';
                }
                _media = new MediaRecorder(processed_stream, {
                    mimeType: mimeType,
                    bitsPerSecond: props.bps || 32000
                });

                if (typeof props.onStream === "function") {
                    props.onStream({ stream, media: _media });
                }

                _media.addEventListener("dataavailable", async (e) => {
                    stream.getAudioTracks().forEach((track) => track.stop());
                    if (_abort) {
                        if (typeof props.onAborted === "function") {
                            props.onAborted();
                        }
                        return;
                    }
                    if (typeof props.onRecorded === "function") {
                        audioChunks.push(e.data);
                        const blob_send = new Blob(audioChunks, {
                            type: "audio/webm",
                        });
                        await props.onRecorded({ data: e.data, blob: blob_send });
                    }
                });
                _media.start();
            })
            .catch((err) => {
                if (typeof props.onError === "function") props.onError(err);
            });
    };
    const play = () => {
        if (!_media) return;
        _abort = false;
        _media.start();
        if (typeof props.onPlay === "function") props.onPlay();
    };
    const pause = () => {
        if (!_media) return;
        _media.pause();
        if (typeof props.onPause === "function") props.onPause();
    };
    const resume = () => {
        if (!_media) return;
        _media.resume();
        if (typeof props.onResume === "function") props.onResume();
    };
    const stop = () => {
        if (!_media) return;
        _media.stop();
        if (typeof props.onStop === "function") props.onStop();
    };
    const abort = () => {
        _abort = true;
        stop();
    };

    const __public = {
        run,
        abort,
        stop,
        pause,
        resume,
    };
    return __public;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function AudioRecorder(props) {
    const _root = typeof props.root === "string" ? document.querySelector(`#${props.root}`) : props.root;
    if (!_root) return;

    const states = {
        rec: false,
        ffmpeg: undefined,
    }
    //TEMPLATES
    const temps = {};
    //ELEMENTS
    const els = {};

    //LOGIC
    const actions = {
        load: () => {
            _root.innerHTML = views.main();
            //TEMPLATES
            temps.rec = document.querySelector('#rec').innerHTML.replace(/{%id%}/g, _root.id);
            temps.rec_tools = document.querySelector('#rec_tools').innerHTML.replace(/{%id%}/g, _root.id);
            temps.audio_temp = document.querySelector('#audio_temp').innerHTML.replace(/{%id%}/g, _root.id);
            //ELEMENTS
            els.main = document.querySelector(`#${_root.id}_main`);

            Load_FFmpeg().then(ffmpeg => {
                states.ffmpeg = ffmpeg;
                actions.goto_rec();
            });
        },
        goto_rec: () => {
            els.main.innerHTML = temps.rec;
            let waveform;

            const microphone = new Microphone({
                bps: 25000,
                onStream: (data) => {
                    const { stream } = data;
                    _root.style.width = "100%";
                    waveform = new WaveForm({
                        root: document.querySelector(`#${_root.id}_waveform`),
                        stream
                    });
                    if (typeof props.onStartRecord === "function") props.onStartRecord();
                },
                onRecorded: (data) => {
                    _root.style.width = "initial";
                    console.log("processed");
                    if (waveform) waveform.finish();
                    actions.convert(data).then((resp) => {
                        const { b64, blob } = resp;
                        if (typeof props.onRecorded === "function") props.onRecorded({ b64: b64, blob: blob });
                    });
                },
                onAborted: () => {
                    _root.style.width = "initial";
                    console.log("aborted");
                    if (waveform) waveform.finish();
                    actions.goto_rec();
                    if (typeof props.onAborted === "function") props.onAborted();
                },
                onPlay: () => {
                    console.log("play");
                },
                onPause: () => {
                    console.log("pause");
                    if (waveform) waveform.pause();
                },
                onResume: () => {
                    console.log("resume");
                    if (waveform) waveform.resume();
                },
                onStop: () => {
                    console.log("stop");
                },
                onError: (err) => {
                    console.log(err);
                }
            });

            els.btn_rec = document.querySelector(`#${_root.id}_btn_rec`);
            els.btn_rec.onclick = () => {
                actions.goto_rec_tools({ microphone });
            };
        },
        goto_converting: () => {
            els.main.innerHTML = "converting...";
        },
        goto_rec_tools: (args) => {
            const { microphone } = args;

            els.main.innerHTML = temps.rec_tools;
            els.btn_send = document.querySelector(`#${_root.id}_btn_send`);
            els.btn_toggle = document.querySelector(`#${_root.id}_btn_toggle`);
            els.btn_abort = document.querySelector(`#${_root.id}_btn_abort`);

            microphone.run();
            states.rec = true;

            els.btn_send.onclick = () => {
                microphone.stop();
                els.main.innerHTML = "finishing...";
            };
            els.btn_toggle.onclick = () => {
                console.log(states.rec);
                if (!states.rec) {
                    els.btn_toggle.classList.add("audiorec_pause");
                    els.btn_toggle.classList.remove("audiorec_play");
                    microphone.resume();
                    states.rec = true;
                } else {
                    els.btn_toggle.classList.add("audiorec_play");
                    els.btn_toggle.classList.remove("audiorec_pause");
                    microphone.pause();
                    states.rec = false;
                }
            };
            els.btn_abort.onclick = () => {
                microphone.abort();
                els.main.innerHTML = "aborting...";
            };
        },
        goto_audio: (div, source) => {
            els[div] = document.querySelector(`#${_root.id}_${div}`);
            els[div].innerHTML = temps.audio_temp;
            const audio_control = document.querySelector(`#${_root.id}_audio_control`);
            audio_control.src = source;
        },
        blob_to_base64: async (blob) => {
            return new Promise(async (resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const b64string = btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                    resolve(b64string);
                }
                reader.onerror = reject;
                reader.readAsArrayBuffer(blob);
            });
        },
        convert: (args) => {
            const { data, blob } = args;
            actions.goto_converting();
            return new Promise(async (resolve) => {
                const resp = new AudioConverter({ audio: data, ffmpeg: states.ffmpeg });
                const mp3_blob = await resp.run();
                const real_blob = new Blob([mp3_blob], { type: "application/octet-stream" });
                const b64encoded = await actions.blob_to_base64(real_blob);
                //await actions.send(real_blob);
                actions.goto_rec();
                //els.final_audio = document.querySelector(`#${_root.id}_final_audio_mp3`);
                //els.final_audio.innerHTML = "Sending...";
                //actions.goto_audio("audio_mp3", `data:audio/mp3;base64,${b64encoded}`);
                resolve({ b64: `data:audio/mp3;base64,${b64encoded}`, blob: real_blob });
                //console.log(b64encoded);
            });
        },
        send: async (endpoint, form_data = {}) => {
            const formData = new FormData();
            for (const k in form_data) {
                formData.append(k, form_data[k]);
            }
            //formData.append("file", blob);
            //formData.append("name", "audio.mp3");

            return new Promise((resolve, reject) => {
                //fetch("https://pfr9ey26n5.execute-api.us-east-1.amazonaws.com/default/TEST-audiorec?accion=upload", {
                fetch(endpoint, {
                    method: "POST",
                    body: formData,
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            //els.final_audio.innerHTML = data.name;
                            reject({ error: true, name: data.name });
                            return;
                        }
                        resolve({ error: false, name: data.name, url: data.url });
                        //els.final_audio.innerHTML = `Audio sent successfully<br><a href="${data.url}" target="_blank">Open it here!</a>`;
                    })
                    .catch(error => console.error("Error:", error));
            });
        }
    }

    const views = {
        main: () => {
            return `${_AUDIOREC_STYLES_}
            ${_AUDIOREC_TEMPLATES_}
            <div>
                <div id="${_root.id}_main">
                    <div class="audiorec_loader"></div>
                </div>
            </div>`;
        },
    };

    actions.load();

    const __public = {
        send: actions.send,
    };
    return __public;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
window.AudioRecorder = AudioRecorder;
