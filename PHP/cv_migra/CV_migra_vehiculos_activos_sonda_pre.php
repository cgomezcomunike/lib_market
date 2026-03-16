<?
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

    $consulta2 = mysql_query("SELECT * FROM `tipo_color` ",$db);
    while($datos2 = mysql_fetch_array($consulta2)){
       $color[$datos2['codigo']] = $datos2['nombre'];
    }


// firma
    $dominio = 'ayura.concesionariovirtual.co';
    $llaveinterna = '218f5f205e018e696645a2ffc81167b6';
	$fecha = $fecha_server_date;

    $firma = hash('sha256', $fecha.''.$dominio.''.$llaveinterna);




// definicion de variables
    $cursor = 0;


//{ "dominio":"andar.concesionariovirtual.co", "firma":"a8bded4c805beb45a265301131cec9b4229e43deb3c83dde3a3c5a45ced0c70c", "accion":"prospectar", "asesor_user":"deicyg", "asesor_nombre":"DEICY YULIET GUERRA", "id":"6c5d2b31-26a1-48d3-bcaf-d840c089ad41", "fecha_creacion":"1659647730", "doc":"1036649732", "cel":"3148195272", "nombre":"JUAN DAVID", "apellido":"CRUZ", "correo":"davidoroxco7@gmail.com", "empresa":"xxxx", "observaciones":"", "historial":"" }
// armamos el listado de propectos

// $celus[1]='3006416931';




// definimos el cursor
    if($cursorXX){
        $cursor = $cursorXX;
    }else{
        $cursor = 1;
	}  
        
    $contador = 0;


echo "SELECT * FROM `producto` WHERE `sub_dir` = '0' AND `campo_1` <> '0' AND `campo_1` <> '105732' id > '".$cursor."' ORDER BY `id` ASC LIMIT 10<br />";
$consulta = mysql_query("SELECT * FROM `producto` WHERE `sub_dir` = '0' AND `campo_1` <> '0' AND `campo_1` <> '105732' AND id > '".$cursor."' ORDER BY `id` ASC LIMIT 10",$db);
while($datos = mysql_fetch_array($consulta)){

    // if($celus[$cursor]){
        
    // }else{
    //     die('termino');
    // }
    
    echo "<hr>";
    //echo $celus[$cursor];
    // tamamos la informacion del usuario de la db
    $cliente = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `id` = '".$datos['campo_1']."' ; ","id,campo_3,campo_5,campo_8,campo_9,campo_10,campo_26,campo_4,campo_24,campo_64,campo_83,campo_19,campo_29,campo_31",$modular_dir."/config/".$modular_ap_name_config.".php");

    $cadena_antiguos = '';
    $consulta2 = mysql_query("SELECT * FROM `producto` WHERE `sub_dir` = '".$datos['id']."' AND `campo_1` <> '".$datos['campo_1']."' AND `campo_1` <> '0' AND `campo_1` <> '105732'",$db);
    while($datos2 = mysql_fetch_array($consulta2)){
        $cliente2 = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `id` = '".$datos2['campo_1']."' ; ","id,campo_3,campo_5,campo_8,campo_9,campo_10,campo_26,campo_4,campo_24,campo_64,campo_83,campo_19,campo_29,campo_31",$modular_dir."/config/".$modular_ap_name_config.".php");
        $cadena_antiguos .= ',{"antiguo":"'.$cliente2['campo_26'].'"}';
    }

    $marca = MEGA_mySQL_R("SELECT * FROM `tipo_marcas` WHERE `codigo` = '".intval($datos['campo_2'])."'","nombre",$modular_dir."/config/".$modular_ap_name_config.".php");
   
    // enviamos Json por curl
    $url = 'https://ezm224zqd8.execute-api.us-east-1.amazonaws.com/default/CRM-api-comercial';
    $myvars = '{
    "dominio":"'.$dominio.'",
    "firma":"'.$firma.'",
    "accion":"vehiculos",
    "placa":"'.$datos['campo_14'].'",
    "vin":"'.$datos['relacion_sofia'].'",
    "id":"'.get_uuid().'",
    "fecha_entrega":"'.$datos['campo_47'].'",
    "usuarios": [
        {"actual":"'.$cliente['campo_26'].'"}'.$cadena_antiguos.'
    ],
    "descripcion":"'.utf8_encode($datos['campo_40']).'",
    "marca":"'.$marca.'",
    "modelo":"'.$datos['campo_25'].'",
    "cilindraje":"'.$datos['campo_8'].'",
    "km":"'.$datos['campo_20'].'",
    "fecha_venta":"'.$datos['campo_5'].'",
    "color":"'.$color[$datos['campo_7']].'"
    }';

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
    
    
    
    $contador++;
    $cursor = $datos['id'];
}



?>
<meta http-equiv="refresh" content="0; url=/v2_base/index.php?sub_cat=CV_migra_vehiculos_activos&cursorXX=<? echo $cursor ?>">
<?

    
    echo "<hr>";

    $_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo $_GET['M21_exe_time'] ;
    
die();



        