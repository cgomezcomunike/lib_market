<?
// variables
unset($arr_familias);
$buffer = '';
$buffer_temp = '';
$buffer_temp2 = '';
$sql_temp = '';



// recorremos el listado de familias
$consulta = mysql_query("SELECT * FROM `familias` WHERE `activo` = '0' ORDER BY `orden` ASC;",$db);
// si enviaron solo un key lo enviamos
while($datos = mysql_fetch_array($consulta))
{
	$arr_familias[$datos['id']]['nombre'] = $datos['nombre'];


	if($sql_temp){
		$sql_temp .= " OR `familia` = '".$datos['id']."' ";
	}else{
		$sql_temp .= " `familia` = '".$datos['id']."' ";
	}
}


// Consultamos los vh
// recorremos el listado de familias

$consulta = mysql_query("SELECT * FROM `calculadora_vehiculos` WHERE `estado` = '1' AND (".$sql_temp.") ORDER BY `precio` ASC;",$db);
// si enviaron solo un key lo enviamos
while($datos = mysql_fetch_array($consulta))
{
	$arr_familias[$datos['familia']]['vh'][$datos['id']]['nombre']	= $datos['nombre'];
	$arr_familias[$datos['familia']]['vh'][$datos['id']]['modano']	= $datos['modelo_dms'];
	$arr_familias[$datos['familia']]['vh'][$datos['id']]['precio']	= $datos['precio'];
	$arr_familias[$datos['familia']]['vh'][$datos['id']]['soat']	= $datos['soat'];
	$arr_familias[$datos['familia']]['vh'][$datos['id']]['iva']		= $datos['iva'];
}

// recorremos el array para generar el json del buffer
while(list($k,$v)=each($arr_familias)){
	$buffer_temp = '';
	$buffer_temp2 = '';

	$buffer_temp .= '{ "familia": "'.$arr_familias[$k]['nombre'].'", "vh" : [';

		while(list($kk,$vv)=each($arr_familias[$k]['vh'])){

			if($buffer_temp2){
				$buffer_temp2 .= ",";
			}

			$buffer_temp2 .='{
				"nombre" : "'.$arr_familias[$k]['vh'][$kk]['nombre'].'",
				"marca" : "Chevrolet",
				"modano" : "'.$arr_familias[$k]['vh'][$kk]['modano'].'",
				"soat" : "'.$arr_familias[$k]['vh'][$kk]['soat'].'",
				"iva" : "'.$arr_familias[$k]['vh'][$kk]['iva'].'",
				"precio" : "'.$arr_familias[$k]['vh'][$kk]['precio'].'"}';
		}



	$buffer_temp .= $buffer_temp2;
	$buffer_temp .= ']}';



	// si ya hay un buffer previo agregamos una coma
	if($buffer){
		$buffer .= ",";
	}
	// concatenamos el buffer 
	$buffer .= $buffer_temp;



}




?>
{
	"lista":[<? echo $buffer ?>]
}

<?

die();


?>