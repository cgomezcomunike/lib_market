<?

    $_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo $_GET['M21_exe_time']."<hr>" ;
	
// funcion para calcular uuid
    function get_uuid() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            // 32 bits for "time_low"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

            // 16 bits for "time_mid"
            mt_rand( 0, 0xffff ),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand( 0, 0x0fff ) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand( 0, 0x3fff ) | 0x8000,

            // 48 bits for "node"
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
        );
    }




// firma
    $dominio = 'autogrande.concesionariovirtual.co';
    $llaveinterna = '218f5f205e018e696645a2ffc81167b6';
	$fecha = $fecha_server_date;

    $firma = hash('sha256', $fecha.''.$dominio.''.$llaveinterna);





// definicion de variables
    $cursor = 0;

// definimos el cursor
    if($cursorXX){
        $cursor = $cursorXX;
    }   
        
    $contador = 0;



	// armamos el listado de propectos
        $consulta = mysql_query("SELECT `id`,`campo_10` FROM `suscripcion_post` WHERE `dominio` = '".$_GET['dominio_id']."' AND `id` > '".$cursor."' AND `campo_10` != '' ORDER BY `id` ASC Limit 1 ",$db);
        $usuario_encontrado = 0;
        while($datos = mysql_fetch_array($consulta)){
            
			
			$cursor = $datos['id'];
			
			echo "-".$datos['id']."-";

			$celus[] = $datos['campo_10'];
			
		}










// blucle para contar cantidad de registros a procesar
while(list($k, $v) = each($celus) ){

    
    echo "<hr>";
    echo $celus[$k];
    // tamamos la informacion del usuario de la db
    $cliente = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `dominio` = '".$_GET['dominio_id']."' AND `campo_10` = '".$celus[$k]."' ; ","id,campo_3,campo_5,campo_10,campo_26,campo_4,campo_24,campo_64,campo_83");

    // cruzmos el asesor
    // echo "<hr>id_cliente:".$cliente['id']."<hr>";
    $asesor = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `dominio` = '".$_GET['dominio_id']."' AND `id` = '".$cliente['campo_64']."' ; ","campo_1,campo_3,campo_10,campo_26,campo_4,campo_24,campo_64");

    // consultamos las tareas del cliente
    unset($requerimientos);
    $sql_historial = '';
    $consulta = mysql_query("SELECT * FROM `requerimientos` WHERE `dominio` = '".$_GET['dominio_id']."' AND `personal_ext` = '-".$cliente['id']."-' AND (`estado` = 'En_proceso' OR  `estado` = 'Sin_iniciar') ORDER BY `id` DESC ",$db);
    $usuario_encontrado = 0;
    while($datos = mysql_fetch_array($consulta)){
        $requerimientos[$datos['id']] = $datos['Nombre']; 
        
        if($sql_historial){
            $sql_historial .= " OR `requerimiento` = '".$datos['id']."' ";
        }else{
            $sql_historial .= " `requerimiento` = '".$datos['id']."' ";
        }
            
    }

    
    // consultamos el historial de las tareas
    $historial_total = '';
    
    // echo $sql_historial;
    
    if($sql_historial){
        $consulta = mysql_query("SELECT * FROM `requerimientos_transacciones` WHERE ".$sql_historial." ORDER BY `id` ASC ",$db);
        $usuario_encontrado = 0;
        while($datos = mysql_fetch_array($consulta)){
            
            $hace_x_tiempo = ($fecha_server - $datos['fecha_timeStamp']);
            $hace_x_tiempo = contar_tiempo_trans( $hace_x_tiempo);

            
            $historial_total .= '<hr><div class="M21_req_historial"> <strong>'.$datos['nombre'].'</strong> <div class="M21_req_historial_data">'.M21_mkfecha_humano($datos['fecha_timeStamp']).'<br /> <span style="color:#666666; font-size:8px">'.$hace_x_tiempo.' antes</span></div><div class="M21_req_historial_datalle">'.$datos['estado'].'<span class="titulo_pn">Observaciones / Comentarios:</span><br />'.$datos['observaciones'].'<br /><br /></div></div>';
        }
    }

    
    $historial_total = utf8_encode($historial_total);
    $historial_total = base64_encode($historial_total);
    
    // enviamos Json por curl
    $url = 'https://ezm224zqd8.execute-api.us-east-1.amazonaws.com/default/CRM-api-comercial';
    $myvars = '{
    "dominio":"'.$dominio.'",
    "firma":"'.$firma.'",
    "accion":"prospectar",
    "asesor_user":"'.$asesor['campo_1'].'",
    "asesor_nombre":"'.$asesor['campo_4'].' '.$asesor['campo_24'].'",
    "id":"'.get_uuid().'",
    "fecha_creacion":"'.$fecha_server.'",
    "doc":"'.$cliente['campo_26'].'",
    "cel":"'.$celus[$k].'",
    "nombre":"'.utf8_encode($cliente['campo_4']).'",
    "apellido":"'.utf8_encode($cliente['campo_24']).'",
    "correo":"'.$cliente['campo_3'].'",
    "empresa":"'.$cliente['campo_5'].'",
    "observaciones":"'.$cliente['campo_83'].'",
    "historial":"'.$historial_total.'"
    }';

     $_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo "<hr>".$_GET['M21_exe_time']."<hr>" ;   
    echo $myvars;
    
    
    $ch_emp = curl_init( $url );
    curl_setopt($ch_emp, CURLOPT_HTTPHEADER, Array("Content-Type: application/json"));
    curl_setopt( $ch_emp, CURLOPT_POST, 1);
    curl_setopt( $ch_emp, CURLOPT_POSTFIELDS, $myvars);
    curl_setopt( $ch_emp, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt( $ch_emp, CURLOPT_HEADER, 0);
    curl_setopt( $ch_emp, CURLOPT_RETURNTRANSFER, 1);
    $response_emp = curl_exec( $ch_emp );
    curl_close($ch_emp);
    echo "<pre>";
    var_dump($response_emp);
    echo "</pre><hr />";
    
	$_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo $_GET['M21_exe_time']."<hr>" ;
    
    $contador++;
}



?>
<meta http-equiv="refresh" content="1; url=/v2_base/index.php?sub_cat=CV_migra_prospectos&cursorXX=<? echo $cursor ?>">
<?

    
    echo "<hr>";

    $_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo $_GET['M21_exe_time'] ;
    
die();



        