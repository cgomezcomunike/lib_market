


// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.getperiodo = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);

    
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
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
    

    
    var time = year + '/' + month;
    return time;
};






// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.getfecha = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);



    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
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
    
    
    var time = year + '/' + month + '/' + date;
    return time;
};



// funcion calcular una fecha en formato de carpetas 
//----------------------------------------------------
exports.getfechahora = function() {
    
    var a = new Date();
    a = a.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    a = new Date(a);


    
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
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
    
    if(hour < 10){
        hour = '0'+hour;
    }
    
    var time = year + '/' + month + '/' + date + '/' + hour ;
    return time;
};

