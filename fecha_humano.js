// funcion calcular una fecha en humano
//----------------------------------------------------
exports.calc = function(timestamp) {
    
    
    // variables
        let fecha_time = '';
        let fecha_hoy = '';
        let fecha_ano_act = '';
        let fecha_sem_act = '';
        let respuesta = '';
        let temp = '';
    
    
    // definimos las variables
        let meses_txt       = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        let meses_num       = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        let dias_sem        = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  

    
    // tomamos la fecha enviada a la funcion
        let UNIX_timestamp  = (timestamp * 1);
        let date_timestamp  = new Date(UNIX_timestamp);
    
    // obtenemos la fecha de hoy
        let a               = Date.now()
        a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' });
        a = a.replace(/[^0-9]/gm,'');
        a = a * 1;
        a = a - 18000000 ;
        a = new Date(a);

    // obtenemos las fechas actuales
        let ano_actual      = a.getFullYear();
        let mes_actual      = a.getMonth() + 1;
        let dia_actual      = a.getDate();
        let dia_sem         = dias_sem[a.getDay()];
        let hora_actual     = a.getHours();



        let hoy             = new Date( Date.UTC(ano_actual, mes_actual - 1, dia_actual, 0,0,1) );
        hoy                 = hoy.getTime();
        hoy                 = hoy + 18000000;
        //hoy.toLocaleString('en-US', { timeZone: 'America/Bogota' })


    
    // calculamos fechas relativas
        // ayer
        let ayer            = hoy - 86400000;

        // ayer
        let manana          = hoy + 172798000;
        
        // semana pasada
        let sem_pass        = hoy - 691200000;
        
        // próxima semana
        let sem_prox        = hoy + 691200000;
    
    


    // obtenemos las fecha del timestamp
        let ano_timestamp      = date_timestamp.getFullYear();
        let mes_timestamp      = date_timestamp.getMonth() + 1;
        let dia_timestamp      = date_timestamp.getDate();
        let dia_sem_timestamp  = dias_sem[date_timestamp.getDay()];
        let hora_timestamp     = date_timestamp.getHours();
        let min_timestamp      = date_timestamp.getMinutes();
        let hora_timestamp_humano = '';
    

    // filtramos los dias y fechas sin 0 adelante
        if(mes_timestamp < 10){
            mes_timestamp = '0'+mes_timestamp;
        }
        if(mes_actual < 10){
            mes_actual = '0'+mes_actual;
        }

        if(dia_timestamp < 10){
            dia_timestamp = '0'+dia_timestamp;
        }

        if(dia_actual < 10){
            dia_actual = '0'+dia_actual;
        }

        if(min_timestamp < 10){
            min_timestamp = '0'+min_timestamp;
        }

    // filtramos la hora timestamp
        if(hora_timestamp > 12){
            temp = hora_timestamp - 12;
            hora_timestamp_humano = temp + ':'+min_timestamp+'pm';
            
        }else{
            hora_timestamp_humano = hora_timestamp + ':'+min_timestamp+'am';
        }



    // calculamos la fecha con el timestamp dado
       fecha_time = dia_timestamp + '/' + mes_timestamp + '/' +ano_timestamp;
       fecha_hoy = dia_actual + '/' + mes_actual + '/' +ano_actual;
       
    // calculamos fecha año actual
       mes_timestamp = (mes_timestamp * 1);
       fecha_ano_act = meses_txt[ (mes_timestamp - 1)] + ' ' + dia_timestamp;
    
    // calculamos fecha esta semana
       mes_timestamp = (mes_timestamp * 1);
       fecha_sem_act = dia_sem_timestamp + ' ' + dia_timestamp;

    // validamos la fecha relativas
    //-----------------------------------------------------------------
    
        // hoy
        if(fecha_time == fecha_hoy){
            respuesta = 'Hoy '+hora_timestamp_humano;
        }else{
            
            // mismo año
            // validamos si el año actual es igual al de el timestamp
            if(ano_actual == ano_timestamp ){
               
                // asignamos una fecha sin año y el mes en formato texto
                respuesta = fecha_ano_act;  
                
                // validamos si esta semana
                if(UNIX_timestamp < sem_prox && UNIX_timestamp > sem_pass ){
                
                    respuesta = fecha_sem_act;  
                    
                    // validamos si es mañana
                    if(UNIX_timestamp < manana && UNIX_timestamp > hoy){
                        respuesta = 'Mañana '+hora_timestamp_humano;  
                    }
                    
                    // validamos si es mañana
                    if(UNIX_timestamp > ayer && UNIX_timestamp < hoy){
                        respuesta = 'Ayer '+hora_timestamp_humano;  
                    }

                }
                
               
            }else{
                respuesta = fecha_time;    
            }
            
        }
    
    
    
    // resultado
    //------------------------------
            // respuesta = respuesta + '---ts:[' + UNIX_timestamp + '] - mañana[' + manana + '] hoy [' + hoy + ']' + ' Ayer['+ayer+'] --';
            return respuesta;
      
      
};


// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.fecha_carta = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var meses_txt       = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var day = days[a.getDay()];
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    
   

    
    var time = meses_txt[month] + ' ' + date +' de '+ year ;
    return time;
};



// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.date = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var meses_txt       = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var day = days[a.getDay()];
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    
    if(month < 10){
       month = '0'+month;
    }
    
    if(date < 10){
       date = '0'+date;
    }
    
    
    var time = year + '-'+month+ '-' + date;
    return time;
};



// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.periodo = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var meses_txt       = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var day = days[a.getDay()];
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    
    if(month < 10){
       month = '0'+month;
    }
    
    
    var time = year + '-'+month;
    return time;
};




// funcion calcular mes
//----------------------------------------------------
exports.getdiasemana = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    var days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    var day = days[a.getDay()];

    
    var time = day;
    return time;
};





// funcion calcular mes
//----------------------------------------------------
exports.getdia = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    
    var dia = a.getDate();


    if(dia < 10){
        dia = '0'+dia;
    }    
    

    
    var time = dia;
    return time;
};






// funcion calcular mes
//----------------------------------------------------
exports.getmes = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    
    var month = a.getMonth() + 1;

    if(month < 10){
        month = '0'+month;
    }    
    

    
    var time = month;
    return time;
};






// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.getano = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    var year = a.getFullYear();


    
    var time = year;
    return time;
};



exports.contar_tiempo_trans = function(timex) {


    // variables
    //---------------------------------
        let timestamp = 0;
        let timeround_ano = 0;
        let timeround_mes = 0;
        let timeround_sem = 0;
        let timeround_dia = 0;
        let timeround_hor = 0;
        let timeround_min = 0;
        let timeround_seg = 0;
        
        let respuesta = '';
        let a = new Date();
        a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
        a = new Date(a);
    
    // obtenemos el timestamp actual
        timestamp = a.getTime();
    
    
    // calculamos cuanto tiempo hay entre el ts enviado y el actual
        timestamp = timestamp - timex;
    

    
    // validamos si el tiempo es negativo es proque esta en el 
    // futuro 
    if(timestamp < 0){
        
        timestamp = timestamp * (-1);
        respuesta = 'dentro de ';
        
    // pasado
    }else{
        
        respuesta = 'hace ';
       
    }

    
    
  
    // validacion de contexto de tiempo
    //--------------------------------------------
        // ano
        timeround_ano = timestamp / 31536000000;
        timeround_ano = Math.floor(timeround_ano) ;

        // mes
        timeround_mes = timestamp / 2592000000;
        timeround_mes = Math.floor(timeround_mes) ;
        
        // semana
        timeround_sem = timestamp / 604800000;
        timeround_sem = Math.floor(timeround_sem) ;

        // dias
        timeround_dia = timestamp / 86400000;
        timeround_dia = Math.floor(timeround_dia) ;

        // horas
        timeround_hor = timestamp / 3600000;
        timeround_hor = Math.floor(timeround_hor) ;

        // minutos
        timeround_min = timestamp / 60000;
        timeround_min = Math.floor(timeround_min) ;
        // segundos
        timeround_seg = timestamp ;
        timeround_seg = Math.floor(timeround_seg) ;
    
    
    
    
    
    
    
        if(timeround_ano >= 1){
            respuesta += timeround_ano + ' ' + (timeround_ano > 1 ? 'años' : 'año');
        }else if(timeround_mes >= 1){
            respuesta += timeround_mes + ' ' + (timeround_mes > 1 ? 'meses' : 'mes');
        }else if(timeround_sem >= 1){
            respuesta += timeround_sem + ' ' + (timeround_sem > 1 ? 'semanas' : 'semana');
        }else if(timeround_dia >= 1){
            respuesta += timeround_dia + ' ' + (timeround_dia > 1 ? 'dias' : 'día');
        }else if(timeround_hor >= 1){
            respuesta += timeround_hor + ' ' + (timeround_hor > 1 ? 'horas' : 'hora');
        }else if(timeround_min >= 1){
            respuesta += timeround_min + ' ' + (timeround_min > 1 ? 'minutos' : 'minuto');
        }else if(timeround_seg >= 1){
            respuesta = 'ahora';
        }
    
    
    
    return respuesta;
    
}







exports.fecha_crm = function(timex) {


    // variables
    //---------------------------------
        let timestamp = 0;
        let timestamp_hoy = -43200000;
        let timeround_ano = 0;
        let timeround_mes = 0;
        let timeround_sem = 0;
        let timeround_dia = 0;
        let timeround_hor = 0;
        let timeround_min = 0;
        let timeround_seg = 0;
        
        let respuesta = '';
        let a = new Date();
        a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
        a = new Date(a);
    
    // obtenemos el timestamp actual
        timestamp = a.getTime();
    
    
    // calculamos cuanto tiempo hay entre el ts enviado y el actual
        timestamp = timestamp - timex;
        
        //return '['+timestamp_hoy+'] ['+timestamp+']';
    
    // validamos si el tiempo es negativo es proque esta en el 
    // futuro 
    if(timestamp < 0){
        if(timestamp_hoy < timestamp ){
            timestamp = timestamp * (-1);
            respuesta = 'Hoy ';
        }else{
            timestamp = timestamp * (-1);
            respuesta = 'Futura Futuro';
        }
        
        
    // pasado
    }else{
        
        respuesta = 'Atrasada Atrasado';
       
    }


    let UNIX_timestamp  = (timex * 1);
    let date_timestamp  = new Date(UNIX_timestamp);
    
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var meses_txt       = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    var year = date_timestamp.getFullYear();
    var month = date_timestamp.getMonth();
    var day = days[date_timestamp.getDay()];
    
   

    
    respuesta += meses_txt[month] + ' ' + year + ' ' + day ;


    
    return respuesta;
    
}


// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.timestamp = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    var timestomp = a.getTime();

    return timestomp;
    
};





// funcion calcular una fecha en humano
//----------------------------------------------------
exports.date_valor = function(timestamp) {
    
    
    // variables
        let fecha_time = '';
        let fecha_hoy = '';
        let fecha_ano_act = '';
        let fecha_sem_act = '';
        let respuesta = '';
        let temp = '';
    

    
    // tomamos la fecha enviada a la funcion
        let UNIX_timestamp  = (timestamp * 1);
        let date_timestamp  = new Date(UNIX_timestamp);
    



    // obtenemos las fecha del timestamp
        let ano_timestamp      = date_timestamp.getFullYear();
        let mes_timestamp      = date_timestamp.getMonth() + 1;
        let dia_timestamp      = date_timestamp.getDate();
        let hora_timestamp     = date_timestamp.getHours();
        let hora_timestamp_humano = '';
    
    
    
    if(mes_timestamp < 10){
       mes_timestamp = '0'+mes_timestamp;
    }
    
    if(dia_timestamp < 10){
       dia_timestamp = '0'+dia_timestamp;
    }
    
    
    
    
    return ano_timestamp+'-'+mes_timestamp+'-'+dia_timestamp;
    

      
};





// funcion calcular una fecha en humano
//----------------------------------------------------
exports.hora_valor = function(timestamp) {
    
    
    // variables
        let fecha_time = '';
        let fecha_hoy = '';
        let fecha_ano_act = '';
        let fecha_sem_act = '';
        let respuesta = '';
        let temp = '';
    

    
    // tomamos la fecha enviada a la funcion
        let UNIX_timestamp  = (timestamp * 1);
        let date_timestamp  = new Date(UNIX_timestamp);
    



    // obtenemos las fecha del timestamp
        let hora_timestamp     = date_timestamp.getHours();
        let minuto_timestamp     = date_timestamp.getMinutes();

    
    
    if(hora_timestamp < 10){
       hora_timestamp = '0'+hora_timestamp;
    }
    
    if(minuto_timestamp < 10){
       minuto_timestamp = '0'+minuto_timestamp;
    }
    
    
    
    
    return hora_timestamp+':'+minuto_timestamp;
    

      
};



// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.date_2_timestamp = function(date) {


    var a = new Date(date);
  
    var timestomp = a.getTime();

    return timestomp;
    
};