<?php
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
    
    $documento[]='70602422';
    $documento[]='70602422';
    $documento[]='71660375';
    $documento[]='1152451740';
    $documento[]='24604807';
    $documento[]='43153156';
    $documento[]='71111822';
    $documento[]='1035236346';
    $documento[]='1044506025';
    $documento[]='1152705054';
    $documento[]='1037622861';
    $documento[]='43051052';
    $documento[]='32350205';
    $documento[]='1017143776';
    $documento[]='1128422780';
    $documento[]='98485946';
    $documento[]='1053785018';
    $documento[]='71363077';
    $documento[]='1017160469';
    $documento[]='900265314';
    $documento[]='900265314';
    $documento[]='1019033125';
    $documento[]='890930176';
    $documento[]='900812901';
    $documento[]='75036464';
    $documento[]='71268519';
    $documento[]='70435438';
    $documento[]='901383689';
    
    
    
    $documento[]='1059842193';
    $documento[]='900757447';
    $documento[]='32225392';
    $documento[]='70563408';
    $documento[]='71697510';
    $documento[]='1017178864';
    $documento[]='890208788';
    
    $documento[]='890911625';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='70351951';
    
    
    
    
    
    
    
    
    
    
    $documento[]='890903937';
    
    
    
    $documento[]='19469901';
    
    
    $documento[]='900488269';
    $documento[]='71226691';
    $documento[]='890900081';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='890903938';
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='4383843';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='6817062';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='43108258';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='43866699';
    $documento[]='71396619';
    $documento[]='1037618127';
    $documento[]='15360220';
    $documento[]='15704638';
    $documento[]='71613466';
    $documento[]='900526571';
    $documento[]='21496136';
    
    
    
    
    
    
    $documento[]='901648465';
    $documento[]='42999312';
    $documento[]='43096252';
    $documento[]='71391145';
    $documento[]='43735144';
    $documento[]='32512174';
    $documento[]='43256869';
    $documento[]='71268989';
    $documento[]='71450095';
    $documento[]='91248843';
    $documento[]='731038';
    $documento[]='1127603858';
    $documento[]='1214719695';
    $documento[]='1128478924';
    $documento[]='91529644';
    $documento[]='70430868';
    $documento[]='71279181';
    $documento[]='1127950581';
    $documento[]='1036657654';
    $documento[]='9273444';
    $documento[]='1032247368';
    $documento[]='43065357';
    $documento[]='1037322298';
    $documento[]='1036638639';
    $documento[]='71726920';
    $documento[]='1128272602';
    $documento[]='43532164';
    $documento[]='831267';
    $documento[]='14237939';
    $documento[]='43014496';
    $documento[]='92529076';
    $documento[]='43253272';
    $documento[]='70111597';
    $documento[]='901221213';
    $documento[]='1128282554';
    $documento[]='1128282554';
    $documento[]='1039691312';
    $documento[]='1193387574';
    $documento[]='1152440944';
    $documento[]='13721069';
    $documento[]='42784749';
    $documento[]='8273088';
    $documento[]='16079835';
    $documento[]='71264645';
    $documento[]='43824109';
    $documento[]='43731965';
    $documento[]='79392794';
    $documento[]='42825680';
    $documento[]='8029114';
    $documento[]='1036627607';
    $documento[]='1047995469';
    $documento[]='1017196665';
    $documento[]='4485406';
    $documento[]='1017129384';
    $documento[]='42825690';
    $documento[]='11792923';
    $documento[]='42989913';
    $documento[]='4045075';
    $documento[]='8061630';
    $documento[]='98648815';
    $documento[]='60403698';
    $documento[]='71703966';
    $documento[]='21394816';
    $documento[]='73094286';
    $documento[]='800250173';
    $documento[]='40975702';
    $documento[]='70046746';
    $documento[]='1128282554';
    $documento[]='1128282554';
    $documento[]='60405395';
    $documento[]='79972169';
    $documento[]='43611483';
    $documento[]='900434012';
    $documento[]='1000746383';
    $documento[]='39268778';
    $documento[]='32142457';
    $documento[]='98532573';
    $documento[]='900242658';
    $documento[]='42885364';
    $documento[]='43635018';
    $documento[]='98703081';
    $documento[]='91017574';
    $documento[]='43665135';
    $documento[]='8275276';
    $documento[]='1069098620';
    $documento[]='98622866';
    $documento[]='1037629388';
    $documento[]='71389489';
    $documento[]='98530031';
    $documento[]='43840125';
    $documento[]='43917778';
    $documento[]='70163963';
    $documento[]='900772880';
    $documento[]='71668793';
    $documento[]='1013369387';
    $documento[]='1036686864';
    $documento[]='8865915';
    $documento[]='1040752454';
    $documento[]='1193119360';
    $documento[]='15511275';
    $documento[]='71767319';
    $documento[]='1128402418';
    $documento[]='811025866';
    $documento[]='1128476545';
    $documento[]='21975881';
    $documento[]='1020411601';
    $documento[]='98486170';
    $documento[]='8071657';
    $documento[]='1152212368';
    $documento[]='1152700567';
    $documento[]='9976078';
    $documento[]='1214748748';
    $documento[]='98698111';
    $documento[]='71600394';
    $documento[]='21527962';
    $documento[]='43759506';
    $documento[]='22041741';
    $documento[]='1037671624';
    $documento[]='43078318';
    $documento[]='42799788';
    $documento[]='43205384';
    $documento[]='15382325';
    $documento[]='1039024641';
    $documento[]='1036666804';
    $documento[]='43737209';
    $documento[]='71174704';
    $documento[]='1214725890';
    $documento[]='1152684974';
    $documento[]='71783677';
    $documento[]='5821542';
    $documento[]='4585226';
    $documento[]='1035427453';
    $documento[]='43739125';
    $documento[]='8784951';
    $documento[]='900342110';
    $documento[]='900265314';
    $documento[]='900265314';
    $documento[]='43279101';
    $documento[]='43817690';
    $documento[]='1007045812';
    $documento[]='70602422';
    $documento[]='70602422';
    $documento[]='901093653';
    $documento[]='901093653';
    $documento[]='71376229';
    $documento[]='1152714130';
    $documento[]='43272607';
    $documento[]='8280035';
    $documento[]='1035855097';
    $documento[]='1036958237';
    $documento[]='900893301';
    $documento[]='900893301';
    $documento[]='1039759435';
    $documento[]='43613947';
    $documento[]='15321592';
    $documento[]='810004032';
    
    
    
    $documento[]='890942310';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='811011779';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='860069497';
    $documento[]='901093653';
    $documento[]='901093653';
    $documento[]='1239488066';
    $documento[]='900193601';
    $documento[]='900893301';
    $documento[]='900893301';
    
    
    $documento[]='39175226';
    $documento[]='43520659';
    $documento[]='43753597';
    $documento[]='98645800';
    $documento[]='1128402058';
    $documento[]='900782286';
    $documento[]='901093653';
    $documento[]='901093653';
    $documento[]='15438443';
    $documento[]='70141209';
    $documento[]='900673838';
    $documento[]='1038408733';
    $documento[]='63538309';
    $documento[]='8038421';
    $documento[]='8349469';
    $documento[]='82361039';
    $documento[]='900700925';
    $documento[]='43274390';
    $documento[]='900776621';
    $documento[]='1036650234';
    $documento[]='901198470';
    $documento[]='1045496539';
    $documento[]='901002475';
    $documento[]='1128435811';
    $documento[]='900520890';
    $documento[]='70117314';
    $documento[]='901312832';
    $documento[]='13744161';
    $documento[]='43756442';
    $documento[]='1114149768';
    $documento[]='1037640038';
    $documento[]='900354591';
    $documento[]='43580492';
    $documento[]='1035414635';
    $documento[]='42071552';
    $documento[]='13514168';
    $documento[]='10105435';
    $documento[]='1035426611';
    $documento[]='1035850957';
    $documento[]='8803376';
    $documento[]='1218464828';
    $documento[]='3399121';
    $documento[]='32487618';
    $documento[]='1037637213';
    $documento[]='1152195672';
    $documento[]='70557996';
    $documento[]='1037643982';
    $documento[]='21501242';
    $documento[]='1063722732';
    $documento[]='1063283164';
    $documento[]='71711742';
    $documento[]='10498648';
    $documento[]='73151333';
    $documento[]='1152204021';
    $documento[]='1033336171';
    $documento[]='39441245';
    $documento[]='10882452';
    $documento[]='1017216575';
    $documento[]='42993030';
    $documento[]='70030003';
    $documento[]='32352804';
    $documento[]='70003192';
    $documento[]='3474227';
    $documento[]='11003114';
    $documento[]='43839924';
    $documento[]='32182200';
    $documento[]='3570340';
    $documento[]='1152186289';
    $documento[]='1039450058';
    $documento[]='1017148797';
    $documento[]='98523408';
    $documento[]='98493732';
    $documento[]='1152444758';
    $documento[]='52014945';
    $documento[]='39178701';
    $documento[]='1088236739';
    $documento[]='42823781';
    $documento[]='21397008';
    $documento[]='17595655';
    $documento[]='41929074';
    $documento[]='98638433';
    $documento[]='71758093';
    $documento[]='900672611';
    $documento[]='43455098';
    $documento[]='42824542';
    $documento[]='42960115';
    $documento[]='42865588';
    $documento[]='1152473018';
    $documento[]='43019292';
    $documento[]='1017181781';
    $documento[]='1017268573';
    $documento[]='1004715507';
    $documento[]='1013358553';
    $documento[]='32180832';
    $documento[]='900192435';
    $documento[]='71212570';
    $documento[]='1037595095';
    $documento[]='1037624529';
    $documento[]='15485418';
    $documento[]='98664346';
    $documento[]='901054457';
    $documento[]='1143376509';
    $documento[]='71585789';
    $documento[]='1039449143';
    $documento[]='43729963';
    $documento[]='1020405487';
    $documento[]='98592584';
    $documento[]='15371935';
    $documento[]='98765663';
    $documento[]='39357500';
    $documento[]='98584193';
    $documento[]='71682741';
    $documento[]='15272431';
    $documento[]='32489257';
    $documento[]='1152709781';
    $documento[]='71877676';
    $documento[]='32517604';
    $documento[]='1036929956';
    $documento[]='32431260';
    $documento[]='1020429770';
    $documento[]='43180141';
    $documento[]='901371271';
    $documento[]='10216286';
    $documento[]='98698524';
    $documento[]='71677284';
    $documento[]='901093653';
    $documento[]='901093653';
    $documento[]='1000888660';
    $documento[]='30374132';
    $documento[]='1214720635';
    $documento[]='1128426352';
    $documento[]='43151842';
    $documento[]='71371978';
    $documento[]='1067845917';
    $documento[]='71660375';
    $documento[]='6789306';
    $documento[]='71393078';
    $documento[]='1039460101';
    $documento[]='1040363834';
    $documento[]='70811475';
    $documento[]='10009804';
    $documento[]='890935847';
    $documento[]='1026130062';
    $documento[]='70602422';
    $documento[]='42790232';
    $documento[]='39164383';
    $documento[]='1037603981';
    $documento[]='2416918';
    $documento[]='5292685';
    $documento[]='1037635110';
    $documento[]='890327282';
    $documento[]='811006409';
    $documento[]='860056330';
    $documento[]='890942310';
    $documento[]='890942310';
    $documento[]='890942310';
    $documento[]='890942310';
    $documento[]='1017215265';
    $documento[]='1078456836';
    $documento[]='42691325';
    $documento[]='15922487';
    $documento[]='901093653';
    $documento[]='901093653';
    $documento[]='900782286';
    $documento[]='900782286';
    $documento[]='900893301';
    $documento[]='900893301';
    $documento[]='1037576532';
    $documento[]='79595509';
    $documento[]='79595509';
    $documento[]='79595509';
    $documento[]='79595509';
    $documento[]='79595509';
    $documento[]='79595509';
    $documento[]='15667161';
    $documento[]='1232401057';
    $documento[]='89006361';
    $documento[]='43151362';
    $documento[]='71115724';
    $documento[]='71639993';
    $documento[]='1017240986';
    
    
    
    
    
    
    $documento[]='1020456098';
    $documento[]='900893301';
    $documento[]='900893301';
    $documento[]='79595509';
    $documento[]='79595509';
    $documento[]='79595509';
    $documento[]='901093653';
    $documento[]='901093653';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='900488269';
    $documento[]='71703389';
    $documento[]='811023661';
    $documento[]='98654077';
    $documento[]='98626196';
    $documento[]='70139516';
    $documento[]='43635822';
    $documento[]='43825785';
    $documento[]='63538309';
    $documento[]='900533897';
    $documento[]='900756467';
    $documento[]='42938437';
    $documento[]='1037448384';
    $documento[]='71267848';
    
    
    
    $documento[]='7562291';
    $documento[]='71708772';
    
    
    
    
    
    
    $documento[]='1128274007';
    $documento[]='1152444547';
    $documento[]='901003965';
    $documento[]='900356683';
    $documento[]='71110507';
    $documento[]='1020437264';
    $documento[]='70514944';
    $documento[]='42895697';
    $documento[]='55300746';
    $documento[]='43971983';
    $documento[]='26424199';
    $documento[]='32017641';
    $documento[]='43098176';
    $documento[]='8160232';
    $documento[]='43158757';
    $documento[]='1017131417';
    $documento[]='21739818';
    $documento[]='43581755';
    $documento[]='42892299';
    $documento[]='1037614171';
    $documento[]='43909358';
    $documento[]='1017214397';
    $documento[]='1152217439';
    $documento[]='15512729';
    $documento[]='21322739';
    $documento[]='11801829';
    $documento[]='901300988';
    $documento[]='1128400072';
    $documento[]='42746404';
    $documento[]='1128448315';
    $documento[]='70692620';
    $documento[]='43466851';
    $documento[]='1035860353';
    $documento[]='2773909';
    $documento[]='8177618';
    $documento[]='1547485';
    $documento[]='1034316378';
    $documento[]='75040207';
    $documento[]='43486537';
    $documento[]='32524508';
    $documento[]='1037573831';
    $documento[]='8698991';
    $documento[]='43522574';
    $documento[]='43989900';
    $documento[]='71376297';
    $documento[]='1128406994';
    $documento[]='1037660671';
    $documento[]='15518103';
    $documento[]='32016673';
    $documento[]='1017160930';
    $documento[]='1017218805';
    $documento[]='21737803';
    $documento[]='71368428';
    $documento[]='71372038';
    $documento[]='1116441131';
    $documento[]='71648063';
    $documento[]='23897302';
    $documento[]='1013366057';
    $documento[]='44001298';
    $documento[]='8430460';
    $documento[]='71670662';
    $documento[]='1128386184';
    $documento[]='1128393298';
    $documento[]='70075065';
    $documento[]='10950774';
    $documento[]='4335684';
    $documento[]='1128404661';
    $documento[]='71591438';
    $documento[]='1017182888';
    $documento[]='71171699';
    $documento[]='43488857';
    $documento[]='1000290473';
    $documento[]='71850315';
    $documento[]='71660375';
    $documento[]='71660375';
    $documento[]='32227324';
    $documento[]='15348079';
    $documento[]='1036619148';
    $documento[]='1048044530';
    $documento[]='70502005';
    $documento[]='43538377';
    $documento[]='70926407';
    $documento[]='1026147431';
    $documento[]='900790555';
    $documento[]='98565021';
    $documento[]='71111822';
    $documento[]='1024498142';
    $documento[]='71666728';
    $documento[]='1017181808';
    $documento[]='43810289';
    $documento[]='1069466115';
    $documento[]='44005490';
    $documento[]='70519727';
    $documento[]='15918080';
    $documento[]='1189523';
    $documento[]='71583753';
    $documento[]='43049148';
    $documento[]='39282166';
    $documento[]='39169685';
    $documento[]='811042306';
    $documento[]='1039471308';
    $documento[]='1017189430';
    $documento[]='32466983';
    $documento[]='42990064';
    $documento[]='900746234';
    $documento[]='70518003';
    $documento[]='93369720';
    $documento[]='71660375';
    $documento[]='71660375';
    $documento[]='71171803';
    $documento[]='900265314';
    $documento[]='70083339';
    $documento[]='1019033125';
    $documento[]='1042770110';
    $documento[]='71719804';
    $documento[]='1035228037';
    $documento[]='900782286';
    $documento[]='900782286';
    $documento[]='70728718';
    
    
    
    
    
    
    $documento[]='71767221';
    $documento[]='79802326';
    $documento[]='42750613';
    $documento[]='1035910445';
    $documento[]='811006409';
    $documento[]='900893301';
    $documento[]='900893301';
    $documento[]='70602422';
    $documento[]='890913902';
    $documento[]='1017202051';
    $documento[]='890905695';
    $documento[]='1035443113';
    $documento[]='50927158';
    $documento[]='890902816';
    $documento[]='32102679';
    $documento[]='70433787';
    $documento[]='890911837';
    $documento[]='6782707';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='22001724';
    $documento[]='32465496';
    $documento[]='53067816';
    $documento[]='1036664375';
    $documento[]='1040733215';
    $documento[]='8262195';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='1037585602';
    $documento[]='1017207465';
    $documento[]='8012441';
    $documento[]='43092336';
    $documento[]='94411177';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='43454008';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='91344098';
    $documento[]='1036638246';
    $documento[]='42824304';
    $documento[]='1042061785';
    $documento[]='43595376';
    $documento[]='1128404908';
    $documento[]='78762918';
    $documento[]='1033341745';
    $documento[]='32467536';
    $documento[]='43677944';
    $documento[]='21530275';
    $documento[]='15365962';
    $documento[]='43758817';
    $documento[]='42892071';
    $documento[]='70812025';
    $documento[]='1038125396';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='900455820';
    $documento[]='71694749';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='1040350752';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='1065601955';
    $documento[]='71629980';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='71777737';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='91527590';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='1152450292';
    $documento[]='64695871';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='1017175773';
    $documento[]='9738329';
    $documento[]='43055393';
    $documento[]='43903172';
    $documento[]='70557996';
    $documento[]='1000412298';
    $documento[]='98628851';
    
    
    
    
    
    
    
    
    $documento[]='71054209';
    $documento[]='41934593';
    $documento[]='900893301';
    $documento[]='900893301';
    $documento[]='32182025';
    $documento[]='43725275';
    $documento[]='1076323111';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='860026518';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $documento[]='43047808';   



// echo "<pre>";
// var_dump($documento);
// echo "</pre>";
$existe_reg = false;

// blucle para contar cantidad de registros a procesar
while($contador < 10){

    if(!isset($documento[$cursor])){
        $contador++;
        $cursor++;
        continue;
    }
    $existe_reg = true;
    echo $contador."<br />";

    $cliente = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `campo_26` = '".$documento[$cursor]."' ; ","id,campo_3,campo_5,campo_8,campo_9,campo_10,campo_26,campo_4,campo_24,campo_64,campo_83,campo_19,campo_29,campo_31",$modular_dir."/config/".$modular_ap_name_config.".php");

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
    $cursor++;
}
echo "<hr>";
if($existe_reg){
?>
<meta http-equiv="refresh" content="0; url=/v2_base/index.php?sub_cat=CV_migra_clientes_activos_docs&cursorXX=<? echo $cursor ?>">
<?
}else{
    echo "Termin&oacute;";
}

    $_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo $_GET['M21_exe_time'] ;
    
die();