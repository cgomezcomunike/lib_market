// numeros
//---------------------------------------------------------
exports.numeros = function(txt)
{
 // validmos que si tenga contenido
    if(txt == undefined){
        txt = 0;
    }else{
    
       	// eliminiamos lo espacios al inicio y final del texto
            txt = txt.trim(); 
     
        // reemplazamos todo lo diferente a numeros
    		txt = txt.replace(/[^0-9]/gm,'');
    }
    
    // retornamos el resultado
        return txt;
}

// dinero
//---------------------------------------------------------
exports.dinero = function(txt)
{
 // validmos que si tenga contenido
    if(txt == undefined){
        txt = 0;
    }else{
    
       	// eliminiamos lo espacios al inicio y final del texto
            txt = txt.trim(); 
     
        // reemplazamos todo lo diferente a numeros
    		txt = txt.replace(/[^0-9]/gm,'');
    		
    		
    	// formateamos los puntos de 3
            let contador_trios = -1; 
            for (var i=txt.length + 1, output='', validos="1234567890"; i>-1; i--) {
    
                if (validos.indexOf(txt.charAt(i)) != -1){
                    output = txt.charAt(i) + output;
        
                     // validamos si hay que poner punto
                     if(contador_trios >= 3){
        
                         if(i >= 1){
                         output = "." + output;
                         }
                         contador_trios = 1;
        
                     }else{
        
                        contador_trios++;
        
                     } 
                }
    
            }
    }
    
    
    // retornamos el resultado
        return output;
}


// alfa
//---------------------------------------------------------
// filtro de al texto alfabetico incluyendo acentos y espacios
// sirve para filtrar nombre o texto basicos
exports.letras = function(txt)
{
 // validmos que si tenga contenido
    if(txt == undefined){
        txt = '';
    }else{

       	// eliminiamos lo espacios al inicio y final del texto
            txt = txt.trim(); 
     
        // reemplazamos todo lo diferente a numeros
    		txt = txt.replace(/[^a-zA-Z| |À|Á|Â|Ã|Ä|Å|à|á|â|ã|ä|å|Ò|Ó|Ô|Õ|Ö|Ø|ò|ó|ô|õ|ö|ø|È|É|Ê|Ë|è|é|ê|ë|Ç|ç|Ì|Í|Î|Ï|ì|í|î|ï|Ù|Ú|Û|Ü|ù|ú|û|ü|ÿ|Ñ|ñ]/gm,'');
		
    }
    // retornamos el resultado
        return txt;
}


// Alfa numerico
//---------------------------------------------------------
// filtro de al texto alfabetico incluyendo acentos y espacios
// sirve para filtrar nombre o texto basicos
exports.alfanum = function(txt)
{
 // validmos que si tenga contenido
    if(txt == undefined){
        txt = '';
    }else{

       	// eliminiamos lo espacios al inicio y final del texto
            txt = txt.trim(); 
     
        // reemplazamos todo lo diferente a numeros
    		txt = txt.replace(/[^a-zA-Z0-9| |À|Á|Â|Ã|Ä|Å|à|á|â|ã|ä|å|Ò|Ó|Ô|Õ|Ö|Ø|ò|ó|ô|õ|ö|ø|È|É|Ê|Ë|è|é|ê|ë|Ç|ç|Ì|Í|Î|Ï|ì|í|î|ï|Ù|Ú|Û|Ü|ù|ú|û|ü|ÿ|Ñ|ñ]/gm,'');
    }		
    // retornamos el resultado
        return txt;
}




// General
// esta funcion es especial para filtrar texarea
//---------------------------------------------------------------------
exports.general = function(txt)
{
 // validmos que si tenga contenido
    if(txt == undefined){
        txt = '';
    }else{


       	// eliminiamos lo espacios al inicio y final del texto
            txt = txt.trim(); 
     
        // reemplazamos los retornos de linea por <br>
    		txt = txt.replace(/(\r\n|\n|\r)/gm, "<br>");
    		
    	// reemplazamos los tab por espacios
    		txt = txt.replace(/(\t)/gm, "<tab>");
    		
        // reemplazamos todo lo diferente a numeros
    		txt = txt.replace(/[^a-zA-Z0-9|\-\_|+|*|/|=|#|$|%|@|?|¿|<|>|(|)|,|;|:|.| |À|Á|Â|Ã|Ä|Å|à|á|â|ã|ä|å|Ò|Ó|Ô|Õ|Ö|Ø|ò|ó|ô|õ|ö|ø|È|É|Ê|Ë|è|é|ê|ë|Ç|ç|Ì|Í|Î|Ï|ì|í|î|ï|Ù|Ú|Û|Ü|ù|ú|û|ü|ÿ|Ñ|ñ]/gm,'');
      
    }
    
    
    // retornamos el resultado
        return txt;
        
        		
}



// General
// esta funcion es especial para filtrar texarea
//---------------------------------------------------------------------
exports.comprimir = function(txt)
{
     
 // validmos que si tenga contenido
    if(txt == undefined){
        txt = '';
    }else{
 
       	// eliminiamos lo espacios al inicio y final del texto
            txt = txt.trim(); 
     
    	// definimos los filtros a aplicar
    	
    	// comentarios 
    	// se filtran los comentarios js, css y html
    	// --------------------------------------
     		// version inicial que causó problema con los base 64
    		// txt = txt.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
    	
    		// comentarios single line // 
    		txt = txt.replace(/\s\/\/.*/gm, '');	// comentarios precedidos por espacio, tab o enter
    		txt = txt.replace(/;\/\/.*/gm, '');		// los precedidos por ; al final de una linea y no se deja espacio
    
    		// comentarios multi line /* lorem ipsum */
    		txt = txt.replace(/\/\*[^*]*(?:\*(?!\/)[^*]*)*\*\//gm, '');
    
    		// comentarios <!-- txt -->
    		txt = txt.replace(/<!--(.*?)-->/gm, '');
    
    	
    	// Compresión 
    	// seccion que comprime el buffer para hacerlo más veloz 
    	// --------------------------------------		
    		// tabuladores
    		txt = txt.replace(new RegExp('	', 'g'), ' ');
    
    		// enter
    		txt = txt.replace(new RegExp("\n", 'g'), ' ');
    		txt = txt.replace(new RegExp("\r", 'g'), ' ');
    
    		// espacios 
    		txt = txt.replace(new RegExp('     ', 'g'), ' ');
    		txt = txt.replace(new RegExp('    ', 'g'), ' ');
    		txt = txt.replace(new RegExp('   ', 'g'), ' ');
    		txt = txt.replace(new RegExp('  ', 'g'), ' ');
    		txt = txt.replace(new RegExp('  ', 'g'), ' ');
    }


	// retornamos el resultado
		return txt;	
        
        		
}