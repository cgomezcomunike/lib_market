<?




//------------------------------------
// migrador de data a CV universo
//------------------------------------



    // validamos si hay cursor
    //------------------------------------
    if($cursor){
        
    }else{
        $cursor = 0;
      
        echo "creamos";
        
        
    }

    // fecha de garantia
    //------------------------------------
    $fecha_ref_garantia = '2021-05-01';


    // filtro para garantizar cvs
    function filtro($txt){
        $resultado = preg_replace("/[^A-Za-z0-9 \- ]/", "", $txt);
        $resultado = trim($resultado);
        if($resultado == ''){
           $resultado = '-'; 
        }
        return $resultado;
    }
    


    // filtro para garantizar cvs
    function filtrotxt($txt){
        $resultado = preg_replace("/[^A-Za-z ]/", "", $txt);
        $resultado = trim($resultado);
        if($resultado == ''){
           $resultado = '-'; 
        }
        return $resultado;
    }

    // filtro para garantizar cvs
    function filtronum($txt){
        $resultado = preg_replace("/[^0-9]/", "", $txt);
        $resultado = trim($resultado);
        if($resultado == ''){
           $resultado = '-'; 
        }
        return $resultado;
    }
    // filtro para garantizar cvs
    function filtroperiodo($txt){
        $resultado = preg_replace("/[^0-9]/", "", $txt);
        $resultado = substr($resultado,0,4)."-".substr($resultado,4,6);
        $resultado = trim($resultado);
        if($resultado == ''){
           $resultado = '-'; 
        }
        return $resultado;
    }
    

    $meses['01'] = 'Ene';
    $meses['02'] = 'Feb';
    $meses['03'] = 'Mar';
    $meses['04'] = 'Abr';
    $meses['05'] = 'May';
    $meses['06'] = 'Jun';
    $meses['07'] = 'Jul';
    $meses['08'] = 'Ago';
    $meses['09'] = 'Sep';
    $meses['10'] = 'Oct';
    $meses['11'] = 'Nov';
    $meses['12'] = 'Dic';

    //-----------------------------------------------------------------------
    // consulta de productos
    //-----------------------------------------------------------------------
        $consulta = mysql_query("SELECT * FROM `producto` WHERE `sub_dir` = '0' AND `id` > '".$cursor."' ORDER BY `id` ASC LIMIT 100 ",$db);
        while($datos = mysql_fetch_array($consulta))
        {
            $cursor = $datos['id'];


            // validamos si hay placa
            if($datos['campo_14']){

            }else{
                continue;
            }


            // calculamos la familia
            $familia = explode(" ",$datos['campo_13']);


            
            //-----------------------------------------------------------------------
            // trasacciones
            //-----------------------------------------------------------------------       

                // obtenemos las ordenes
                $ultima_fecha = '';
                $ult_mto = '';
                $ult_kms = '';
                $ult_bodega = '';
                $ult_colision = '';
                $ordenes = 0;
                $estacionalidad = [];
                $estacionalidad_txt = '';

                $consulta2 = mysql_query("SELECT * FROM `transacciones_".$_GET['dominio_id']."` WHERE `placa` = '".$datos['campo_14']."' ORDER BY `fecha` DESC;",$db);
                while($datos2 = mysql_fetch_array($consulta2))
                {
                    // validamos utl colision
                        if($ult_colision){

                        }else{
                            $pos = stripos($datos2['desc_razon'], "COLISION");

                            if($pos === false){}else{
                                $ult_colision = $datos2['fecha'];
                            }
                        }

                    // validmaos el utlimo mto
                        if($ult_mto){

                        }else{
                            if($datos2['operacion']){
                                $ult_mto = $datos2['fecha'];
                            }
                        }

                    // validmaos utl fecha
                        if($ultima_fecha){

                        }else{
                            $ultima_fecha = $datos2['fecha'];
                            $ult_kms = floor($datos2['kms'] / 10000);
                            $ult_kms = $ult_kms * 10000;
                            $ult_bodega = $datos2['bodega'];
                        }

                    // estacionalidad
                        $temp = explode("-",$datos2['fecha']);
                        $estacionalidad[$meses[$temp[1]]] = "-";

                    // contamos las ordenes
                        $ordenes++;
                }

                // calculamos la estacionalidad final
                while(list($k,$v)=each($estacionalidad)){
                    if($estacionalidad_txt){
                        $estacionalidad_txt .= '-';
                    }
                    $estacionalidad_txt .= $k."";
                }










            
            //-----------------------------------------------------------------------
            // proeycciones
            //-----------------------------------------------------------------------       


                $ult_proyeccion = '';
                $proy_caliente = '';
                $proy_caliente_servicio = '';
                $proy_tibia = '';
                $proy_fria = '';  
                $proy_congelada = '';
                $proy_frecuencia_marca = '';
                $proy_frecuencia_cliente = '';
                $proy_kmdia = '';

                $consulta3 = mysql_query("SELECT * FROM `citas_proyectado_".$_GET['dominio_id']."` WHERE `carro` = '".$datos['campo_14']."' AND `borrar` = '1' ORDER BY `fecha` DESC;",$db);
                while($datos3 = mysql_fetch_array($consulta3))
                {
                    if($datos3['elegida'] == 1){
                        $ult_proyeccion = $datos3['fecha'];
                    }

                    $proy_caliente = $datos3['fecha_caliente'];
                    $proy_caliente_servicio = $datos3['kilometraje_proy'];
                    $proy_tibia = $datos3['fecha_tibio'];
                    $proy_fria = $datos3['fecha_frio'];
                    $proy_congelada = $datos3['fecha_congela'];


                    $proy_frecuencia_cliente = $datos3['periodo'];
                    $proy_frecuencia_cliente =  floor($proy_frecuencia_cliente / 10);
                    $proy_frecuencia_cliente =  ($proy_frecuencia_cliente * 10);
                    
                    $proy_frecuencia_marca = $datos3['periodo'];
                    $proy_frecuencia_marca =  floor($proy_frecuencia_marca / 10);
                    $proy_frecuencia_marca =  ($proy_frecuencia_marca * 10);

                    $proy_kmdia = $datos3['kmdia'];
                    $proy_kmdia = floor($proy_kmdia / 10);
                    $proy_kmdia = $proy_kmdia * 10;
                    

                }

            
            

            
            //-----------------------------------------------------------------------
            // ultima agenda 
            //-----------------------------------------------------------------------       
                $ultima_agenda = '';
                $consulta4 = mysql_query("SELECT * FROM `citas_proyectado_".$_GET['dominio_id']."` WHERE `carro` = '".$datos['campo_14']."' AND `borrar` = '1' ORDER BY `fecha` DESC;",$db);
                while($datos4 = mysql_fetch_array($consulta4))
                {
                    $ultima_agenda = $datos4['fecha'];
                }


            //-----------------------------------------------------------------------
            // ultima tarea 
            //-----------------------------------------------------------------------       
                $ultima_tarea = '';
                $contactable = '-';
                $consulta5 = mysql_query("SELECT * FROM `requerimientos` WHERE `producto` = '".$datos['id']."' AND 
                (
                `resultado` = 'No tiene el kilometraje - Hacer acuerdo' 
                OR `resultado` = 'No puede atender - Llamar despues' 
                OR `resultado` = 'Cita de taller agendada' 
                OR `resultado` = 'El cliente se comunica' 
                OR `resultado` = 'Vehiculo asistio' 
                OR `resultado` = 'No interesado por mal servicio'
                OR `resultado` = 'No interesado hizo mantenimiento otro CCS'
                OR `resultado` = 'No puede atender - Llamar despues'
                OR `resultado` = 'No interesado por precio'
                OR `resultado` = 'Vehiculo asistio'
                )  ORDER BY `id` DESC LIMIT 1;",$db);
                while($datos5 = mysql_fetch_array($consulta5))
                {
                    $ultima_tarea = $datos5['fecha_presupuesto'];
                    $contactable = 'Si';
                }




            //-----------------------------------------------------------------------
            // tareas_ultimo ano
            //-----------------------------------------------------------------------       
                $tareas_ano = '';
                $fecha_temp_ano = date("Y-m-", strtotime("-1 year")) ."01";
                
                $consulta5 = mysql_query("SELECT * FROM `requerimientos` WHERE `producto` = '".$datos['id']."' AND `fecha_solicitud` >= '".$fecha_temp_ano."'  ORDER BY `id` DESC ;",$db);
                while($datos5 = mysql_fetch_array($consulta5))
                {
                    $tareas_ano++;
                }

            //-----------------------------------------------------------------------
            // tareas_ultimo semestre
            //-----------------------------------------------------------------------       
            $tareas_semestre = '';
            $fecha_temp_ano = date("Y-m-", strtotime("-6 months")) ."01";
            
            $consulta5 = mysql_query("SELECT * FROM `requerimientos` WHERE `producto` = '".$datos['id']."' AND `fecha_solicitud` >= '".$fecha_temp_ano."'  ORDER BY `id` DESC ;",$db);
            while($datos5 = mysql_fetch_array($consulta5))
            {
                $tareas_semestre++;
            }


            //-----------------------------------------------------------------------
            // contactos
            //-----------------------------------------------------------------------       
            $tareas_semestre = '';
            $fecha_temp_ano = date("Y-m-", strtotime("-6 months")) ."01";
            $contacto_actual = "";
            $consulta5 = mysql_query("SELECT * FROM `suscripcion_post` WHERE `id` = '".$datos['campo_1']."' ",$db);
            while($datos5 = mysql_fetch_array($consulta5))
            {
                $contacto_actual = $datos5['campo_4']." ".$datos5['campo_24']." ".$datos5['campo_25']." (".$datos5['campo_10']." ".$datos5['campo_8']." ".$datos5['campo_9'].")";
            }




            //-----------------------------------------------------------------------
            // insert SQL
            //-----------------------------------------------------------------------       

                // insertamos
                mysql_query("INSERT INTO universo (id, placa, parque, sede, nuevo_usado, marca, familia, modelo, tipo_vh, entrega, entrega_ano, kilometraje, km_dia, frecuencia_cliente, frecuencia_marca, colision, flota, en_garantia, ult_proyeccion, ult_proyeccion_ano, ult_agenda, ult_agenda_ano, ult_ingreso, ult_ingreso_ano, ult_mto_aceite, ult_mto_aceite_ano, ult_colision, ult_colision_ano, ult_contacto, ult_contacto_ano, contactabilidad, tareas_ano, tareas_semestre, perdido, perdido_razon, perdido_fecha, perdido_ano, tecnico_mecanica, proy_caliente, proy_caliente_servicio, proy_tibio, proy_tibio_servicio, proy_frio, proy_frio_servicio, proy_congelado, proy_congelado_servicio, desertor, estacionalidad, ordenes_tot, contacto_actual, contactos_historial) 
                VALUES 
                (
                0,
                '".filtro($datos['campo_14'])."',
                '".filtro(($datos['campo_5'] ? 'Propio' : 'Ajeno' ))."', 
                '".filtro($ult_bodega)."', 
                '".filtro($datos['campo_39'])."',
                '".filtro(($datos['campo_2']))."', 
                '".filtro(($familia[0]." ".$familia[1] ? $familia[0]." ".$familia[1] : 'NA' ))."',
                '".filtro($datos['campo_25'])."',
                'tipo_vh',
                '".filtro($datos['campo_5'])."',
                '".substr(filtro($datos['campo_5']),0,4)."',
                '".filtro($ult_kms)."',
                '".filtro($proy_kmdia)."', 
                '".filtro($proy_frecuencia_cliente)."', 
                '".filtro($proy_frecuencia_marca)."', 
                '".filtro(($ult_colision ? 'Si':'No'))."', 
                '".filtro(($datos['campo_89'] ? 'Flota' : ''))."', 
                '".filtro(($datos['campo_5'] > $fecha_ref_garantia ? "Si" : 'No'))."', 
                '".filtro($ult_proyeccion)."', 
                '".substr(filtro($ult_proyeccion),0,4)."', 
                '".filtro($ultima_agenda)."', 
                '".substr(filtro($ultima_agenda),0,4)."', 
                '".filtro($ultima_fecha)."', 
                '".substr(filtro($ultima_fecha),0,4)."', 
                '".filtro($ult_mto)."', 
                '".substr(filtro($ult_mto),0,4)."', 
                '".filtro($ult_colision)."', 
                '".substr(filtro($ult_colision),0,4)."', 
                '".filtro($ultima_tarea)."', 
                '".substr(filtro($ultima_tarea),0,4)."', 
                '".filtro($contactable)."',
                '".filtro($tareas_ano)."',
                '".filtro($tareas_semestre)."',
                '".($datos['campo_90'] ? 'Si' : 'No')."',
                '".filtrotxt($datos['campo_90'])."',
                '".filtroperiodo($datos['campo_90'])."',
                '".substr(filtroperiodo($datos['campo_90']),0,4)."', 
                'Tecnico mecanica',
                '".filtro($proy_caliente)."',
                '".filtro($proy_caliente_servicio)."',
                '".filtro($proy_tibia)."', 
                '".filtro($proy_tibia)."', 
                '".filtro($proy_fria)."',
                '".filtro($proy_fria)."',
                '".filtro($proy_congelada)."',
                '".filtro($proy_congelada)."',
                'desertor',
                '".filtro($estacionalidad_txt)."',
                '".filtro($ordenes)."',
                '".$contacto_actual."',
                'contactos_historial'
                );");

            
        }

        

	$_GET['M21_exe_time'] = $obj->obtener_tiempo();
	echo $_GET['M21_exe_time'] ;
?>
<META http-equiv="refresh" content="0;URL=/v2_base/index.php?sub_cat=calc_universo&cursor=<? echo $cursor ?>"> 
<?
die();
?>
