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



// if($_SESSION['idUSER_web']['id'][0]){
if(1){
	
	$respu = '';
	

	

	$usuario_sync = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `campo_1` = '".$usuario."' AND (`estado` = '2' OR `estado` = '1' ) ORDER BY `id` DESC LIMIT 1; ","id",$modular_dir."/config/".$modular_ap_name_config.".php");


	$consulta = mysql_query("SELECT * FROM `requerimientos` WHERE `Estado` != 'Finalizado' AND `Estado` != 'Abortado' AND `id` != '0' AND `papelera` = '0' AND `temp` = '0' AND `personal` LIKE '%-".$usuario_sync."-%' AND `fecha_presupuesto` >= '2022-07-01'  ORDER BY `fecha_presupuesto_timeStamp` DESC",$db);

	while($datos = mysql_fetch_array($consulta)){
		
			$uuid = get_uuid();
		
			$id_cliente = explode("-",$datos['personal_ext']);
		
		
			$cliente = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `id` = '".$id_cliente[1]."' ; ","campo_3,campo_10,campo_26,campo_4,campo_24",$modular_dir."/config/".$modular_ap_name_config.".php");
		
	
		
			if($respu){
				$respu .= ', ';
			}
		
			// temperatura
			$stage = 'migrado';

		
		
			$fecha_temp = ($datos['fecha_presupuesto_timeStamp'] ? $datos['fecha_presupuesto_timeStamp'] : $fecha_server);
			$fecha_temp = $fecha_temp * 1000;
		
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
	}

	
	echo '{"clientes": ['.$respu.']}';

}

die();
?>