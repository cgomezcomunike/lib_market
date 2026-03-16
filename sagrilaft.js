const https = require('https');

const doPostRequest = (id) => {

/*
        const data = {
          "nombre": "camilo torres martinez",
          "identificacion": "71984381",
          "cantidadPalabras": "1",
          "tienePrioridad_4": false
        };

*/

    const data = {
      "nombre": "Carlos Enrique Gómez Suarez",
      "identificacion": "98670539",
      "cantidadPalabras": "1",
      "tienePrioridad_4": false
    };
    

    return new Promise((resolve, reject) => {
   
   
   
    // https://ambientetest.datalaft.com:2095/api/ConsultaPrincipal

/*
    const options = {
      "host": 'ambientetest.datalaft.com',
      "port": '2095',
      "path": '/api/ConsultaPrincipal',
      "method": 'POST',
      "headers": {
        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYi5jb2xvcmFkbyAgICAgICAgICAiLCJuYmYiOjE2ODM1NTQxOTgsImV4cCI6MTcxNTExMTc5OCwiaWF0IjoxNjgzNTU0MTk4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8ifQ.pprQIYakLDQTH92668mhM4CQMBcEC6zLgNXeq00m-SU',
        "Content-Type": 'application/json'
      }
    };
*/

    const options = {
      "host": 'inspektor.datalaft.com',
      "port": '2100',
      "path": '/api/ConsultaPrincipal',
      "method": 'POST',
      "headers": {
        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV1NfTGxhbm9HICAgICAgICAgICAiLCJuYmYiOjE2OTMzNDMyNTksImV4cCI6MTcyNDkwMDg1OSwiaWF0IjoxNjkzMzQzMjU5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM5OC8ifQ.Pp86jz40QXYZ47YoKVia2fX0BbQ_x_joOUYDO2eUKFE',
        "Content-Type": 'application/json'
      }
    };




    
    //create the request object with the callback with the result
    const req = https.request(options, (res) => {
        
       // response from server
        if(res.statusCode==200){
            var chunka=[];
            res.on('data', function(chunk) {
                chunka.push(chunk);
            });
            res.on('end', function(){
                try {
                  console.log(chunka.toString());
                    chunka = JSON.parse(Buffer.concat(chunka).toString());
                } catch(e) {
                    reject(e);
                }
                console.log(chunka);
                resolve(chunka);
            });
        }else{
            reject('Error');
        }
        
        
        /*
        console.log('-->'+ res);
        resolve(JSON.stringify(res.statusCode));
        */
        //resolve(res);
    });



    // handle the possible errors
    req.on('error', (e) => {
      reject(e.message);
    });
    

    //do the request
    req.write(JSON.stringify(data));

    //finish the request
    req.end();
  });
};


exports.handler = async (event) => {
    
    let dataresp = '';
    let i = 1;
    
    //for(i = 230; i < 250 ; i++ ){
        dataresp = await doPostRequest(i+"")
        .then(result => console.log(`Status code: ${result}`))
        .catch(err => console.error(`Error doing the request for the event: ${JSON.stringify(event)} => ${err}`));
        
    //}
     

};