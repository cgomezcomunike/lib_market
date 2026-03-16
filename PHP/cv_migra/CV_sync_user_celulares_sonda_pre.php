<?
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



if($_SESSION['idUSER_web']['id'][0]){
	
	$respu = '';
	

	

	$usuario_sync = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `campo_1` = '".$usuario."' AND (`estado` = '2' OR `estado` = '1' ) ORDER BY `id` DESC LIMIT 1; ","id",$modular_dir."/config/".$modular_ap_name_config.".php");


	$consulta = mysql_query("SELECT * FROM `requerimientos` WHERE `estado` != 'Finalizado' AND `estado` != 'Abortado' AND `id` != '0' AND `papelera` = '0' AND `temp` = '0' AND `personal` LIKE '%-".$usuario_sync."-%'  ORDER BY `fecha_presupuesto_timeStamp` DESC",$db);
	while($datos = mysql_fetch_array($consulta)){
		
			$uuid = get_uuid();
		
			$id_cliente = explode("-",$datos['personal_ext']);
		
		
			$cliente = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `id` = '".$id_cliente[1]."' AND `campo_26` != '' AND campo_10 NOT LIKE '%1111111%'","campo_3,campo_10,campo_26,campo_4,campo_24",$modular_dir."/config/".$modular_ap_name_config.".php");

	
		
            if($cliente['campo_10']){

            }else{
				//echo "SELECT * FROM `suscripcion_post` WHERE `id` = '".$id_cliente[1]."' AND `campo_26` != ''<br />";
                continue;
            }
		
			// temperatura
			$stage = '';
			if($datos['clasificacion'] == 'Frio'){
				$stage = 'verde';
			}else if($datos['clasificacion'] == 'Congelado'){
				$stage = 'verde';
			}else if($datos['clasificacion'] == 'Tibio'){
				$stage = 'amarillo';
			}else if($datos['clasificacion'] == 'Caliente'){
				$stage = 'verde';
			}
		
		
			$fecha_temp = ($datos['fecha_presupuesto_timeStamp'] ? $datos['fecha_presupuesto_timeStamp'] : $fecha_server);
			$fecha_temp = $fecha_temp * 1000;

			$respu .= '$celus[]=\''.$cliente['campo_10']."';<br>";
			

			/*
			$respu .= '{
						"id": "'.$uuid.'",
						"nombre": "'.$cliente['campo_4'].' '.$cliente['campo_24'].'",
						"cel": "'.$cliente['campo_10'].'",
						"doc": "'.$cliente['campo_26'].'",
						"mail": "'.$cliente['campo_3'].'",
						"vh_cot": "",
						"vh_cot_historial": "",
						"stage": "'.$stage.'",
						"fecha_seguimiento": "'.$fecha_temp.'",
						"estado": "'.$datos['estado'].'",
						"resultado": "'.$datos['resultado'].'"
					}';

			*/
	}

	
	echo $respu;

}

die();
?>