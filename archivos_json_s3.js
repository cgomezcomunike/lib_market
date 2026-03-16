//---------------------------------------------------------
//CAbe anotar que no se hace ninguna capa de historial o versiones por que de esa parte se encarga S3
//---------------------------------------------------------

// Leer archivos
//---------------------------------------------------------
exports.leer = async function(key)
{
     
    // cargamos las librerias
        const AWS           = require('aws-sdk');  
    
    
    // S3
    //------------------------------------------
            const ID = process.env.ID;
            const SECRET = process.env.SECRET;
    
        // The name of the bucket that you have created
            const BUCKET_NAME = process.env.BUCKET_NAME;
        
    // inicializamos S3
        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
            
    
    // promesa de ejecucion                               
        return await new Promise((resolve, reject) => {
        var paramx = {
            Bucket: BUCKET_NAME,
            Key: key
        };
    
        // obtenemos el archivo
            return s3.getObject(paramx, function(err, data) {
                if (err) {
                    resolve('{}');
                    return;
                    //throw err;
                }
        
                
                // parceamos el contenido del archivo
                    let respuesta = data.Body.toString('utf-8');
                    
                // resolvemos el resultado del archivo
                    resolve(respuesta);
            });
            
        });
}


























// guardar archivos
//---------------------------------------------------------
exports.guardar = async function(key,contenido)
{
     
    // cargamos las librerias
        const AWS           = require('aws-sdk');  
        const filtrar       = require("../lib/filtrar.js");
    
    // S3
    //------------------------------------------
            const ID = process.env.ID;
            const SECRET = process.env.SECRET;
    
        // The name of the bucket that you have created
            const BUCKET_NAME = process.env.BUCKET_NAME;
        
    // inicializamos S3
        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
            
            
    // comprimimos el contenido
        contenido = filtrar.comprimir(contenido);
            
    
    // promesa de ejecucion                               
        return await new  Promise((resolve, reject) => {
            var paramx = {
                Bucket: BUCKET_NAME,
                ContentType : "application/json",
                Key: key,
                Body: contenido
            };
            
            
            return s3.upload(paramx, function(err, data) {
                
                if (err) {
                    resolve('{}');
                    return;
                    //throw err;
                }
                
                    
                // resolvemos el resultado del archivo
                    resolve('{"resultado":"ok"}');
            });

        });
}























//---------------------------------------------------------
//CAbe anotar que no se hace ninguna capa de historial o versiones por que de esa parte se encarga S3
//---------------------------------------------------------

// Leer archivos
//---------------------------------------------------------
exports.listar = async function(prefix,limit)
{
     

     
    // cargamos las librerias
        const AWS           = require('aws-sdk');  
    

    // S3
    //------------------------------------------
            const ID = process.env.ID;
            const SECRET = process.env.SECRET;
    
        // The name of the bucket that you have created
            const BUCKET_NAME = process.env.BUCKET_NAME;

    
    
    // inicializamos S3
        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
            
    

    
    // consultamos los archivos
    //-----------------------------------------------
            let istruncated = true;
            let paginador;
            let contador = 0;
            let temptxt = '';
            let espacio = '';
            let resultado_json = '';

            var params = {
                Bucket:BUCKET_NAME,
                Delimiter: '/',
                MaxKeys: limit,
                Prefix: prefix
            };
            
            
            while(istruncated){ 
                

                
                // si el paginador esta definido lo cargamos
                if (paginador) {
                    params.Marker = paginador;
                }
                
                
                let response = await s3.listObjects(params).promise();
                
                

                response.Contents.forEach(item => {
                    contador++;
                    
           

                    
                    
                    // filtramos el resultado
                        temptxt = item.Key;
                        
                        temptxt = temptxt.replace(new RegExp(prefix, 'g'), espacio);
                        temptxt = temptxt.replace(new RegExp('/', 'g'), espacio);
                        temptxt = temptxt.replace(new RegExp('.json', 'g'), espacio);
                        
                        temptxt = temptxt.trim();

                       
                        tempfecha = item.LastModified.toString();
                        tempfecha = tempfecha.substr(0,10);

                        
                        if(temptxt){
                            // ingresamos el json
                            if(resultado_json){
                               resultado_json += ',';
                            }
                                
                            resultado_json += `{"nombre": "`+temptxt+`", "fecha" : "`+tempfecha+`"}`;

                        }

        
                });
                
                
                // validacion para pasar a la siguiente pagina
                    istruncated = response.IsTruncated;
    
                    
                    if (istruncated && contador > 0) {
                        paginador = response.Contents.slice(-1)[0].Key;
                    }
                
            
            }
            
            
            return `{"listado" : [`+resultado_json+`] }`;
            
        

}





















// Actualizar archivos
//---------------------------------------------------------
exports.actualizar = async function(key,json)
{
    
    //console.log(key);
    //librerias
    //--------------------------------------------------
        const jsonS3            = require("../lib/archivos_json_s3.js");
    
    // variables
    //------------------------------------------
        let archivo_actual      = '';
        let respuesta_guardar   = '';
        let variable_S3         = ''
        let contenido           = ''
        let temp_json           = '';


    
    // leemos el archivo actual
    //------------------------------------------
        archivo_actual = await jsonS3.leer(key);
        contenido = JSON.parse(archivo_actual);
        
        
        // validamos si el archivo actual existe
        if(contenido.id){
            // no hacemos nada
        }else{
             // asignamos el valor enviado por el usuario
                contenido = JSON.parse(json);
        }
        


    // Json
    // leemos el json enviado para actualizar / agregar los objetos enviados
    // ---------------------------------------------------------------------
        
        
        // parseamos el json que nos enviaron
        json = JSON.parse(json);
    
        
        // estado
        if(json.estado){
            contenido.estado = json.estado;
        }


        // resultado
        if(json.resultado){
            contenido.resultado = json.resultado;
        }

        // resultado_contact
        if(json.resultado_contact){
            contenido.resultado_contact = json.resultado_contact;
        }


        // fecha_cita
        if(json.fecha_cita){
            contenido.fecha_cita = json.fecha_cita;
        }



        // fecha de seguimiento comercial
        if(json.fecha_seguimiento_comercial){
            contenido.fecha_seguimiento_comercial = json.fecha_seguimiento_comercial;
        }
        
        // fecha de cotizacion comercial
        if(json.fecha_cotizacion_comercial){
            contenido.fecha_cotizacion_comercial = json.fecha_cotizacion_comercial;
        }
        
        // fecha de cotizacion comercial
        if(json.modano_cotizado){
            contenido.modano_cotizado = json.modano_cotizado;
        }
        
        // fecha de cotizacion comercial
        if(json.vh_cotizado){
            contenido.vh_cotizado = json.vh_cotizado;
        }
        
        
        // fecha de cotizacion comercial
        if(json.retoma){
            contenido.retoma = json.retoma;
        }
        
        
        
        // fecha de cotizacion comercial
        if(json.cot_financiacion){
            contenido.cot_financiacion = json.cot_financiacion;
        }
        // fecha de cotizacion comercial
        if(json.cot_financia_inicial){
            contenido.cot_financia_inicial = json.cot_financia_inicial;
        }
        // fecha de cotizacion comercial
        if(json.cot_financiacion_plazo){
            contenido.cot_financiacion_plazo = json.cot_financiacion_plazo;
        }
        // fecha de cotizacion comercial
        if(json.cot_financia_tasa){
            contenido.cot_financia_tasa = json.cot_financia_tasa;
        }

        
        
        
        
        
        
        // fecha de testdrive comercial
        if(json.fecha_testdrive_comercial){
            contenido.fecha_testdrive_comercial = json.fecha_testdrive_comercial;
        }
        
       
        


        
        
        // fecha de seguimiento comercial
        if(json.stage){
            contenido.stage = json.stage;
        }
        
   
        // actulizamos el asesor
        if(json.asesor_id){
            // si habia asesor id
            if(contenido.asesor_id){
                // no hacemos nada   
            }else{
                // actualizamos la fecha
                contenido.asesor_id = json.asesor_id;
            }
        }
        
        // actulizamos el usuario del asesor
        if(json.asesor_user){
            // si habia asesor id
            if(contenido.asesor_user){
                // no hacemos nada   
            }else{
                // actualizamos la fecha
                contenido.asesor_user = json.asesor_user;
            }
        }
        
        // actulizmaos el nombre del asesor
        if(json.asesor_nombre){
            // si habia asesor id
            if(contenido.asesor_nombre){
                // no hacemos nada   
            }else{
                // actualizamos la fecha
                contenido.asesor_nombre = json.asesor_nombre;
            }
        }
        

        
        
        
        
        // actulizamos la sede
        if(json.sede){
            contenido.sede = json.sede;
        }
        
        // validamos si enviaron primera fecha de toque
        if(json.fecha_primera){
            // si qye habia primera fecha la omitimos
            if(contenido.fecha_primera){
                // no hacemos nada   
            }else{
                // actualizamos la fecha
                contenido.fecha_primera = json.fecha_primera;
            }
        }
        

        // preprogramamos el usuario
        if(json.fecha_antiguedad){
            // si qye habia primera fecha la omitimos
            if(contenido.fecha_antiguedad){
                // no hacemos nada   
            }else{
                // actualizamos la fecha
                contenido.fecha_antiguedad = json.fecha_antiguedad;
            }

        }

 
        // preprogramamos el usuario
        if(json.fecha_creacion){
            contenido.fecha_creacion = json.fecha_creacion;
        }

        
        
        // actulizamos la fecha de ultima actividad
        if(json.fecha_ultima){
            contenido.fecha_ultima = json.fecha_ultima;
        }
        
        // preprogramamos el usuario
        if(json.fecha_programada){
            contenido.fecha_programada = json.fecha_programada;
        }
        
        // si enviaron fecha de cierre
        if(json.fecha_cierre){
            contenido.fecha_cierre = json.fecha_cierre;
        }
        
        // actualizamos el documento de identidad
        if(json.doc){
            contenido.doc = json.doc;
        }
        
        // actualizamos el nombre
        if(json.nombre){
            contenido.nombre = json.nombre;
        }
        
        // actulizamos el apellidos
        if(json.apellido){
            contenido.apellido = json.apellido;
        }
        
        // actulizamos el correo
        if(json.correo){
            contenido.correo = json.correo;
        }
        
        // actulizamos el vh de interes
        if(json.vh_preferencia){
            contenido.vh_preferencia = json.vh_preferencia;
        }
        
        // actualizamos la empresa
        if(json.empresa){
            contenido.empresa = json.empresa;
        }
        
        // actualizamos la empresa
        if(json.area_bieniestar_empresa){
            contenido.area_bieniestar_empresa = json.area_bieniestar_empresa;
        }
        
        // actualizamos la empresa
        if(json.numero_empleados){
            contenido.numero_empleados = json.numero_empleados;
        }
        
        // actualizamos la empresa
        if(json.tiene_flota){
            contenido.tiene_flota = json.tiene_flota;
        }
        
        // actualizamos la empresa
        if(json.cant_vh){
            contenido.cant_vh = json.cant_vh;
        }
        
        // actulizamos el genero
        if(json.genero){
            contenido.genero = json.genero;
        }
        
        // actualizamos el medio de ingreso
        if(json.medio){
            contenido.medio = json.medio;
        }
        
        // actuliamos el habeas
        if(json.habeas){
            contenido.habeas = json.habeas;
        }
        
        // actuliamos el habeas
        if(json.habeas_medio){
            contenido.habeas_medio = json.habeas_medio;
        }
        
        // actualizamos las observaciones
        if(json.observaciones){
            contenido.observaciones = json.observaciones;
        }
        
        
    
    // guardamos el archivo actualizado
    // ---------------------------------------------------------------------
    
        // convertimos al string para guardar
         contenido = JSON.stringify(contenido);
         
        //console.log(contenido);
        // guardamos
        respuesta_guardar = await jsonS3.guardar(key, contenido);
    
        // retornamos el resultado        
        return respuesta_guardar;

    
}

