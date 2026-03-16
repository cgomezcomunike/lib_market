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




// firma
    $dominio = 'andar.concesionariovirtual.co';
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


$consulta = mysql_query("SELECT * FROM `suscripcion_post` WHERE `campo_26` <> '' AND `id_dms` <> '0' AND `id` <> 105732 AND id > '".$cursor."' ORDER BY `id` ASC LIMIT 10",$db);
echo "SELECT * FROM `suscripcion_post` WHERE `campo_26` <> '' AND `id_dms` <> '0' AND `id` <> 105732 AND id > '".$cursor."' ORDER BY `id` ASC LIMIT 10<br />";
while($cliente = mysql_fetch_array($consulta)){


    // cruzmos el asesor
    // echo "<hr>id_cliente:".$cliente['id']."<hr>";
    $asesor = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `id` = '".$cliente['campo_64']."' ; ","campo_1,campo_3,campo_10,campo_26,campo_4,campo_24,campo_64",$modular_dir."/config/".$modular_ap_name_config.".php");


    $tels = '';
    $mails = '';

    if(trim($cliente['campo_8']) != '' && trim($cliente['campo_8']) != '1111111' && trim($cliente['campo_8']) != '11111111' && trim($cliente['campo_8']) != '111111111' && trim($cliente['campo_8']) != '1111111111' && trim($cliente['campo_8']) != trim($cliente['campo_10'])){
        $tels .= ',
        "'.trim($cliente['campo_8']).'"';
    }
    if(trim($cliente['campo_9']) != '' && trim($cliente['campo_9']) != '1111111' && trim($cliente['campo_9']) != '11111111' && trim($cliente['campo_9']) != '111111111' && trim($cliente['campo_9']) != '1111111111' && trim($cliente['campo_9']) != trim($cliente['campo_10']) && trim($cliente['campo_8']) != trim($cliente['campo_9'])){
        $tels .= ',
        "'.trim($cliente['campo_9']).'"';
    }

    if(trim($cliente['campo_3']) != '' && trim($cliente['campo_3']) != 'notiene@andar.com.co'){
        $mails .= '"'.trim($cliente['campo_3']).'"';
    }
    if(trim($cliente['campo_31']) != '' && trim($cliente['campo_31']) != 'notiene@andar.com.co' && trim($cliente['campo_3']) != trim($cliente['campo_31'])){
        if($mails != ''){
            $mails .= ',
            "'.trim($cliente['campo_31']).'"';
        }else{
            $mails .= '"'.trim($cliente['campo_31']).'"';
        }
    }
    $sexo = '';
    if($cliente['campo_29'] == '1'){
        $sexo = 'F';
    }elseif($cliente['campo_29'] == '2'){
        $sexo = 'M';
    }elseif($cliente['campo_29'] == '3'){
        $sexo = 'E';
    }
    // enviamos Json por curl
    $url = 'https://ezm224zqd8.execute-api.us-east-1.amazonaws.com/default/CRM-api-comercial';
    $myvars = '{
    "dominio":"'.$dominio.'",
    "firma":"'.$firma.'",
    "accion":"clientes",
    "asesor_user":"'.$asesor['campo_1'].'",
    "asesor_nombre":"'.$asesor['campo_4'].' '.$asesor['campo_24'].'",
    "id":"'.get_uuid().'",
    "fecha_creacion":"'.$fecha_server.'",
    "doc":"'.$cliente['campo_26'].'",
    "cel": [
        "'.$cliente['campo_10'].'"'.$tels.'
    ],
    "nombre":"'.utf8_encode($cliente['campo_4']).'",
    "apellido":"'.utf8_encode($cliente['campo_24']).'",
    "correo": [
        '.$mails.'
    ],
    "empresa":"'.$cliente['campo_5'].'",
    "observaciones":"'.$cliente['campo_83'].'",
    "fecha_nacimiento":"'.$cliente['campo_19'].'",
    "genero":"'.$sexo.'"
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
    $cursor = $cliente['id'];
}



?>
<meta http-equiv="refresh" content="0; url=/v2_base/index.php?sub_cat=CV_migra_clientes_activos&cursorXX=<? echo $cursor ?>">
<?

    
    echo "<hr>";

    $_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo $_GET['M21_exe_time'] ;
    
die();



        