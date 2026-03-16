exports.handler = async (event, context, callback) => {
    const file_name = "https://s3.amazonaws.com/adjunto.concesionariovirtual.co/WhatsApp+Video+2024-04-05+at+11.13.51+AM.mp4";
	
    const file_array = file_name.split(".");
    const file_ext = file_array[file_array.length - 1];
    const file_type = mimes[file_ext];
    const content_type = file_type+'/'+file_ext;

    const read_image_data = await read_url_file(file_name);
    const read_image_data_b64 = Buffer.from(read_image_data).toString('base64');

    const cel = '573154663222';
    const mensaje = 'Nos coronamos las imagenes iutaaaaa!!';
    
    const send_data = await answer_chat(mensaje, cel, '', content_type, read_image_data_b64);
	
	const puma_html = 'OK';
    console.log("exec-peluche");

    callback(null, {
        statusCode: 200,
        headers: {"content-type": "text/html; charset=utf-8"},
        body: puma_html
    });
};

const mimes = {
    "jpg":"image",
	"bmp":"image",
	"jpeg":"image",
	"png":"image",
	"gif":"image",
	"txt":"text",
	"csv":"text",
	"rtf":"text",
	"mp4":"video",
	"avi":"video",
	"wmv":"video",
	"mpg":"video",
	"mpeg":"video",
	"mkv":"video",
	"pdf":"application",
	"xls":"application",
	"xlsx":"application",
	"doc":"application",
	"docx":"application",
	"ppt":"application",
	"pptx":"application",
	"mp3":"audio",
	"wav":"audio",
	"flac":"audio",
	"ogg":"audio",
	"aac":"audio"
}

/* -------------------------------------------------
FUNCION PARA RESPONDER AL CHAT QUE LLEGA DEL CLIENTE
------------------------------------------------- */
async function answer_chat(msg, phone, wa_file_id, file_type, media_b64)
{
    const msg_raw = msg;
    //msg = msg.replace(/<br>/g, '\\n');
    const https = require('https');
    
    let method = "POST";
    let host = "platform.clickatell.com";
    let path = "/v1/message";
    let post_vars = '';
    
    const template_send = {
      "messages": [
        {
          "channel": "whatsapp",
          "to": phone,
          "content": media_b64,
          "media": {
            "contentType": file_type,
            "caption": msg
          }
        }
      ]
    }
        
    post_vars = JSON.stringify(template_send);
    
    let headers = {'Content-Type':'application/json', 'Authorization':'7mPC0dBnRLutGylnyZoDdw==', 'Accept': "application/json"};
    let timeout = 10000;
    
    return new Promise((resolve, reject) => {
        const options = {
            hostname: host,
            path: path,
            method: method,
            timeout: timeout,
            headers: headers
        };
        
        const req = https.request(options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300)
            {
                return reject(new Error('statusCode=' + res.statusCode));
            }
        
            var body = [];
            res.on('data', function(chunk)
            {
                body.push(chunk);
            });
        
            res.on('end', function()
            {
                try
                {
                    //body = JSON.parse(Buffer.concat(body).toString());
                    body = body.toString();
                    let wp_msg_obj = JSON.parse(body);
                    
                    let msg_id = wp_msg_obj["messages"][0]["apiMessageId"];
                    
                    let msg_date_obj = new Date();
                    let str_month = parseInt(msg_date_obj.getMonth()) + 1;
                    let str_day = msg_date_obj.getDate();
                    let str_year = msg_date_obj.getFullYear();
                    
                    if(str_month.toString().length == 1)
                        str_month = "0" + str_month;
                    if(str_day.toString().length == 1)
                        str_day = "0" + str_day;
                    
                    let msg_date = str_year + '-' + str_month + '-' + str_day;
                    
                    let chat_ts = new Date().getTime();
                    let direction = 'out';
                    
                    msg = msg.replace(/\\n/g, '<br>');
                    
                    let new_chat = '{"from":"573137713000", "msg_text":"'+msg+'", "msg_sender":"ComunikeBot", "msg_id":"'+msg_id+'", "msg_ts":"'+chat_ts+'"}';
                    
                    resolve(body);
                }
                catch(e)
                {
                    reject(e);
                }
            });
        });
        
        req.on('error', (e) => {
            reject(e.message);
        });

        req.write(post_vars);
        req.end();
    });
}

async function read_url_file(url_file)
{
    const array_url = url_file.split("://");
    const protocol = array_url[0];
    const full_url = array_url[1];
    const full_url_array = full_url.split("/");
    const host = full_url_array[0];
    const path = full_url.replace(host, "");
    
    let myPromise = new Promise(function(resolve, reject)
    {
        const https = require(protocol);
        const request = https.request({
            rejectUnauthorized: false,
            method: "GET",
            hostname: host,
            path: path,
            timeout:10000,
            headers:{}
        }, (res) => {
            const chunks = [];
            
            res.on("data", (chunk) => {
                chunks.push(chunk);
            });
            
            res.on("end", () => {
                try
                {
                    const buffer = Buffer.concat(chunks);
                    resolve(buffer);
                }
                catch(e)
                {
                    reject(e);
                }
            });
        });
        
        request.end();
    });
    
    return myPromise;
}