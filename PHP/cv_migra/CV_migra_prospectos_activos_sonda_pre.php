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

$celus[]='3146187710';
$celus[]='3136226733';
$celus[]='3054487197';
$celus[]='3012122791';
$celus[]='3137478777';
$celus[]='3052026025';
$celus[]='3206039847';
$celus[]='3116342381';
$celus[]='3016155441';
$celus[]='3046465689';
$celus[]='3122894591';
$celus[]='3173004144';
$celus[]='3176475931';
$celus[]='3022188621';
$celus[]='3177737690';
$celus[]='3006122249';
$celus[]='3127539952';
$celus[]='3012302731';
$celus[]='3136989860';
$celus[]='3014303940';
$celus[]='3217647218';
$celus[]='3113463680';
$celus[]='3015354931';
$celus[]='3215216370';
$celus[]='3128715294';
$celus[]='3053412823';
$celus[]='3012302731';
$celus[]='3217110243';
$celus[]='3183158804';
$celus[]='3007777209';
$celus[]='3117217012';
$celus[]='3136410481';
$celus[]='3104622279';
$celus[]='3160666695';
$celus[]='3104333043';
$celus[]='3004140093';
$celus[]='3147297960';
$celus[]='3146169697';
$celus[]='3012829526';
$celus[]='3146794726';
$celus[]='3104267501';
$celus[]='3216621724';
$celus[]='3206492304';
$celus[]='3112326484';
$celus[]='3136838020 ';
$celus[]='3148058112';
$celus[]='3165776543';
$celus[]='3104194873';
$celus[]='3004816618';
$celus[]='3005870599';
$celus[]='3127023623';
$celus[]='3146646313';
$celus[]='3104277978';
$celus[]='3136939073';
$celus[]='3148644712';
$celus[]='3014350415';
$celus[]='3128807810';
$celus[]='3177779975';
$celus[]='3195427782';
$celus[]='3218170971';
$celus[]='3006149668';
$celus[]='3008243095';
$celus[]='3104477232';
$celus[]='3017881625';
$celus[]='3122230240';
$celus[]='3228910450';
$celus[]='3147721881';
$celus[]='3104146033';
$celus[]='3128836072';
$celus[]='3127935511';
$celus[]='3148105273';
$celus[]='3204754508';
$celus[]='3017910351';
$celus[]='3041164194';
$celus[]='3116124728';
$celus[]='3006078234';
$celus[]='3177391545';
$celus[]='3146621843';
$celus[]='3012810789';
$celus[]='3003089881';
$celus[]='3136967148';
$celus[]='3006203484';
$celus[]='3233385705';
$celus[]='3116096999';
$celus[]='3148285542';
$celus[]='3138727222';
$celus[]='3005490383';
$celus[]='3104477232';
$celus[]='3232919076';
$celus[]='3126001467';
$celus[]='3185786887';
$celus[]='3113811364';
$celus[]='3218114822';
$celus[]='3008019356';
$celus[]='3136284039';
$celus[]='3128407036';
$celus[]='3153617301';
$celus[]='3127579619';
$celus[]='3147831247';
$celus[]='3104346597';
$celus[]='3164276211';
$celus[]='3194444296';
$celus[]='3122888096';
$celus[]='3217587964';
$celus[]='3014344085';
$celus[]='3007737332';
$celus[]='3103960334';
$celus[]='3162942462';
$celus[]='3108252019';
$celus[]='3104825192';
$celus[]='3127268465';
$celus[]='3003496450';
$celus[]='3115068876';
$celus[]='3103758471';
$celus[]='3113398646';
$celus[]='3103721789';
$celus[]='3108779685';
$celus[]='3108322352';
$celus[]='3004673714';
$celus[]='3245130650';
$celus[]='3103731764';
$celus[]='3146203740';
$celus[]='3008264921';
$celus[]='3007548811';
$celus[]='3235910573';
$celus[]='3188581603';
$celus[]='3113684827';
$celus[]='3218237462';
$celus[]='3024287570';
$celus[]='3022935865';
$celus[]='3023274693';
$celus[]='3127775726';
$celus[]='3122633881';
$celus[]='3015958732';
$celus[]='3006654234';
$celus[]='3104310022';
$celus[]='3006175968';
$celus[]='3216468121';
$celus[]='3245353121';
$celus[]='3045354706';
$celus[]='3226795444';
$celus[]='3104041401';
$celus[]='3507380490';
$celus[]='3104114079';
$celus[]='3137601300';
$celus[]='3174135727';
$celus[]='3002882928';
$celus[]='3206897906';
$celus[]='3174355668';
$celus[]='3145638134';
$celus[]='3017882553';
$celus[]='3152760163';
$celus[]='3014573764';
$celus[]='3202563591';
$celus[]='3223063803';
$celus[]='3107099974';
$celus[]='3136598877';
$celus[]='3002187774';
$celus[]='3122998240';
$celus[]='3146611674';
$celus[]='3008643710';
$celus[]='3218491415';
$celus[]='3007320088';
$celus[]='3146646313';
$celus[]='3023274693';
$celus[]='3022990394';
$celus[]='3107053258';
$celus[]='3127775726';
$celus[]='3164719693';
$celus[]='3160666695';
$celus[]='3044569360';
$celus[]='3006203484';
$celus[]='3166478389';
$celus[]='3012829526';
$celus[]='3207551718';
$celus[]='3108257408';
$celus[]='3022990394';
$celus[]='3002475191';
$celus[]='3156208655';
$celus[]='3002045884';
$celus[]='3146147799';
$celus[]='3004993141';
$celus[]='3218872368';
$celus[]='3504228402';
$celus[]='3144752388';
$celus[]='3114351481';
$celus[]='3136774773';
$celus[]='3182175101';
$celus[]='3218266330';
$celus[]='3185074773';
$celus[]='3017374245';
$celus[]='3004343060';
$celus[]='3207173529';
$celus[]='3207083625';
$celus[]='3146820553';
$celus[]='3235830156';
$celus[]='3015572783';
$celus[]='3148233700';
$celus[]='3007774240';
$celus[]='3146820553';
$celus[]='3003300526';
$celus[]='3003027205';
$celus[]='3004719058';
$celus[]='3148673791';
$celus[]='3007537535';
$celus[]='3146312820';
$celus[]='3013728166';
$celus[]='3245653485';
$celus[]='3127491528';
$celus[]='3002740771';
$celus[]='3002390012';
$celus[]='3016423536';
$celus[]='3234909885';
$celus[]='3206154439';
$celus[]='3002099091';
$celus[]='3207727606';
$celus[]='3116781155';
$celus[]='3113632717';
$celus[]='3136451081';
$celus[]='3004686938';
$celus[]='3202918103';
$celus[]='3046150408';
$celus[]='3135275004';
$celus[]='3007480200';
$celus[]='3046122466';
$celus[]='3224225058';
$celus[]='3113018276';
$celus[]='3173614387';
$celus[]='3152297517';
$celus[]='3145548354';
$celus[]='3103853273';
$celus[]='3233289975';
$celus[]='3158575366';
$celus[]='3207453424';
$celus[]='3173761433';
$celus[]='3206971911';
$celus[]='3218307159';
$celus[]='3154075767';
$celus[]='3246260842';
$celus[]='3155344846';
$celus[]='3146794849';
$celus[]='3164672517';
$celus[]='3163220021';
$celus[]='3104229203';
$celus[]='3105686393';
$celus[]='3152691529';
$celus[]='3112163766';
$celus[]='3104143950';
$celus[]='3008715109';
$celus[]='3015166367';
$celus[]='3105836277';
$celus[]='3184394785';
$celus[]='3504933339';
$celus[]='3103960334';
$celus[]='3007164200';
$celus[]='3135948076';
$celus[]='3152691529';
$celus[]='3003274282';
$celus[]='3212009890';
$celus[]='3102995885';
$celus[]='3104442954';
$celus[]='3057925040';
$celus[]='3117266181';
$celus[]='3006555205';
$celus[]='3053169494';
$celus[]='3203889632';
$celus[]='3167400098';
$celus[]='3007788710';
$celus[]='3105176978';
$celus[]='3245025884';
$celus[]='3232334721';
$celus[]='3005227207';
$celus[]='3016907918';
$celus[]='3022847225';
$celus[]='3106996865';
$celus[]='3006730102';
$celus[]='3135103336';
$celus[]='3218012806';
$celus[]='3145520637';
$celus[]='3186962916';
$celus[]='3152699424';
$celus[]='3143827474';
$celus[]='3184015876';
$celus[]='3136931141';
$celus[]='3108535260';
$celus[]='3013934607';
$celus[]='3174917079';
$celus[]='3016968533';
$celus[]='3146576752';
$celus[]='3017156930';
$celus[]='3183620697';
$celus[]='3006505679';
$celus[]='3122958186';
$celus[]='3104903627';
$celus[]='3122573658';
$celus[]='3174415140';
$celus[]='3122856437';
$celus[]='3136272490';
$celus[]='3233230810';
$celus[]='3016489685';
$celus[]='3113489142';
$celus[]='3104901136';
$celus[]='3108213393';
$celus[]='3008736075';
$celus[]='3168530516';
$celus[]='3183546105';
$celus[]='3206694674';
$celus[]='3136221050';
$celus[]='3207216050';
$celus[]='3163794488';
$celus[]='3017352560';
$celus[]='3195038043';
$celus[]='3234609288';
$celus[]='3146857798';
$celus[]='3194386744';
$celus[]='3003667166';
$celus[]='3108359181';
$celus[]='3113208577';
$celus[]='3175348034';
$celus[]='3217786243';
$celus[]='3208757837';
$celus[]='3127050969';
$celus[]='3117808050';
$celus[]='3217348727';
$celus[]='3013577182';
$celus[]='3154104108';
$celus[]='3104414019';
$celus[]='3116098530';
$celus[]='3024623263';
$celus[]='3012018297';
$celus[]='3114096964';
$celus[]='3007818441';
$celus[]='3117699908';
$celus[]='3117699908';
$celus[]='3503476723';
$celus[]='3117036535';
$celus[]='3006610839';
$celus[]='3007041789';
$celus[]='3148572171';
$celus[]='3005752650';
$celus[]='3234588857';
$celus[]='3013257173';
$celus[]='3178039898';
$celus[]='3226598700';
$celus[]='3013513595';
$celus[]='3127704345';
$celus[]='3013734061';
$celus[]='3003772885';
$celus[]='3116302777';
$celus[]='3135856420';
$celus[]='3105158799';
$celus[]='3122753583';
$celus[]='3005596449';
$celus[]='3187074488';
$celus[]='3135294965';
$celus[]='3146397827';
$celus[]='3105138489';
$celus[]='3104465665';
$celus[]='3042908380';
$celus[]='3014148772';
$celus[]='3192558810';
$celus[]='3229312429';
$celus[]='3103938610';
$celus[]='3043273975';
$celus[]='3105534487';
$celus[]='3017630628';
$celus[]='3216478486';
$celus[]='3156295165';
$celus[]='3206068674';
$celus[]='3225798975';
$celus[]='3162927849';
$celus[]='3004754798';
$celus[]='3023875418';
$celus[]='3177653751';
$celus[]='3225113668';
$celus[]='3502717270';
$celus[]='3146943128';
$celus[]='3003791146';
$celus[]='3164784350';
$celus[]='3207089496';
$celus[]='3127586163';
$celus[]='3004155211';
$celus[]='3175297001';
$celus[]='3104086894';
$celus[]='3004774483';
$celus[]='3147963389';
$celus[]='3005122370';
$celus[]='3193884921';
$celus[]='3017704693';
$celus[]='3505722057';
$celus[]='3176986222';
$celus[]='3041240000';
$celus[]='3185380644';
$celus[]='3232276987';
$celus[]='3117699908';
$celus[]='3217152148';
$celus[]='3205404937';
$celus[]='3155766056';
$celus[]='3113199187';
$celus[]='3002000009';
$celus[]='3022197606';
$celus[]='3173633088';
$celus[]='3233931654';
$celus[]='3154881460';
$celus[]='3137756566';
$celus[]='3104495217';
$celus[]='3042351698';
$celus[]='3113586850';
$celus[]='3218254800';
$celus[]='3004896349';
$celus[]='3016914853';
$celus[]='3137672673';
$celus[]='3012417961 ';
$celus[]='3012096363';
$celus[]='3125084986';
$celus[]='3024534347';
$celus[]='3108919765';
$celus[]='3218465275';
$celus[]='3028342324';
$celus[]='3113351072';
$celus[]='3103989913';
$celus[]='3155856799';
$celus[]='3014255892';
$celus[]='3022881626';
$celus[]='3185897441';
$celus[]='3147081061';
$celus[]='3128792630';
$celus[]='3206332207';
$celus[]='3217365337';
$celus[]='3112548180';
$celus[]='3012371399';
$celus[]='5773658555';
$celus[]='3043904744';
$celus[]='3017428346';
$celus[]='3122950171';
$celus[]='3117280491';
$celus[]='3216178745';
$celus[]='3168418433';
$celus[]='3148624117';
$celus[]='3108953249';
$celus[]='3147857787';
$celus[]='3016986945';
$celus[]='3207638241';
$celus[]='3102158953';
$celus[]='3178484627';
$celus[]='3006024881';
$celus[]='3218394892';
$celus[]='3148608854';
$celus[]='3008789938';
$celus[]='3206083307';
$celus[]='3016865285';
$celus[]='3116125971';
$celus[]='3023577188';
$celus[]='3012689332';
$celus[]='3505894759';
$celus[]='3107405674';
$celus[]='3104697551';
$celus[]='3502145016';
$celus[]='3012512992';
$celus[]='3128594872';
$celus[]='3206268487';
$celus[]='3507007624';
$celus[]='3147907046';
$celus[]='3206542425';
$celus[]='3125152562';
$celus[]='3042998390';
$celus[]='3017482143';
$celus[]='3023516587';
$celus[]='3183613913';
$celus[]='3053427451';
$celus[]='3217669658';
$celus[]='3215635628';
$celus[]='3005351056';
$celus[]='3106447711';
$celus[]='3117062514';
$celus[]='3113830843';
$celus[]='3146143426';
$celus[]='3146804904';
$celus[]='3104121404';
$celus[]='3218901566';
$celus[]='3006116263';
$celus[]='3003394925';
$celus[]='3224831088';
$celus[]='3227778894';
$celus[]='3124257289';
$celus[]='3138727222';
$celus[]='3215392480';
$celus[]='3143564378';
$celus[]='3174277599';
$celus[]='3155037101';
$celus[]='3172330070';
$celus[]='3116137524';
$celus[]='3218963271';
$celus[]='3104562743';
$celus[]='3145048926';
$celus[]='3235290120';
$celus[]='3172329328';
$celus[]='3217062502';
$celus[]='3023288227';
$celus[]='3045416589';
$celus[]='3105219343';
$celus[]='3117001433';
$celus[]='3126988499';
$celus[]='3002196102';
$celus[]='3053264180';
$celus[]='3163684009';
$celus[]='3006669502';
$celus[]='3217595113';
$celus[]='3105278077';
$celus[]='3127111144';
$celus[]='3006657211';
$celus[]='3108948394';
$celus[]='3208539077';
$celus[]='3042083166';
$celus[]='3104497726';
$celus[]='3207145645';
$celus[]='3016585299';
$celus[]='3006753130';
$celus[]='3174389109';
$celus[]='3137652901';
$celus[]='3127664852';
$celus[]='3113082030';
$celus[]='3207757239';
$celus[]='3105329730';
$celus[]='3057313795';
$celus[]='3117737157';
$celus[]='3137165601';
$celus[]='3105127865';
$celus[]='3028294288';
$celus[]='3104126605';
$celus[]='3196469520';
$celus[]='3212851172';
$celus[]='3102828960';
$celus[]='3214939975';
$celus[]='3006908581';
$celus[]='3128754601';
$celus[]='3125253412';
$celus[]='3154035201';
$celus[]='3137939602';
$celus[]='3178719624';
$celus[]='3104215864';
$celus[]='3117089295';
$celus[]='319290160';
$celus[]='3104953484';
$celus[]='3507109483';
$celus[]='3146026025';
$celus[]='3148968675';
$celus[]='3144255045';
$celus[]='3014078752';
$celus[]='3112372818';
$celus[]='3218315872';
$celus[]='3004356504';
$celus[]='3186354971';
$celus[]='3028470022';
$celus[]='3136558661';
$celus[]='3106265969';
$celus[]='3114730950';
$celus[]='3014303155';
$celus[]='3136546000';
$celus[]='3128573978';
$celus[]='3146283030';
$celus[]='3225768088';
$celus[]='3104723628';
$celus[]='3125420247';
$celus[]='3165665856';
$celus[]='3232919076';
$celus[]='3106869948';
$celus[]='3023747739';
$celus[]='3173453805';
$celus[]='3113068813';
$celus[]='3007777870';
$celus[]='3127109391';
$celus[]='3215632665';
$celus[]='3024254327';
$celus[]='3155948009';
$celus[]='3122997482';
$celus[]='3508823086';
$celus[]='3003496450';
$celus[]='3148053838';
$celus[]='3193363965';
$celus[]='3023161200';
$celus[]='3116471528';
$celus[]='3184990991';
$celus[]='3145063248';
$celus[]='3165708586';
$celus[]='3147348333';
$celus[]='3004822192';
$celus[]='3122502421';
$celus[]='3008764199';
$celus[]='3015416216';
$celus[]='3122209300';
$celus[]='3136468733';
$celus[]='3108341880';
$celus[]='3187171259';
$celus[]='3219035190';
$celus[]='3113972202';
$celus[]='3016388462';
$celus[]='3006861704';
$celus[]='3206665797';
$celus[]='3195035411';
$celus[]='3135257652';
$celus[]='3015015289';
$celus[]='3217503315';
$celus[]='3054849193';
$celus[]='3116640028';
$celus[]='3186862293';
$celus[]='3152622173';
$celus[]='3015676479';
$celus[]='3118962657';
$celus[]='3046712618';
$celus[]='3006981370';
$celus[]='3044288653';
$celus[]='3015171453';
$celus[]='3166912362';
$celus[]='3128357996';
$celus[]='3104240612';
$celus[]='3225086233';
$celus[]='3108592877';
$celus[]='3207461305';
$celus[]='3155554524';
$celus[]='3195815347';
$celus[]='3225044290';
$celus[]='3113156627';
$celus[]='3206357040';
$celus[]='3173749991';
$celus[]='3006269333';
$celus[]='3145016677';
$celus[]='3017853665';
$celus[]='3206151003';
$celus[]='3135315739';
$celus[]='3002846717';
$celus[]='3116145329';
$celus[]='3173759871';
$celus[]='3104445017';
$celus[]='3145273290';
$celus[]='3216443804';
$celus[]='3207051545';
$celus[]='3057314993';
$celus[]='3137228073';
$celus[]='3127834037';
$celus[]='3197290909';
$celus[]='3233675535';
$celus[]='3176587938';
$celus[]='3157716226';
$celus[]='3052567411';
$celus[]='3012705035';
$celus[]='3148666346';
$celus[]='3136625891';
$celus[]='3197814756';
$celus[]='3116335414';
$celus[]='3214987483';
$celus[]='3195173938';
$celus[]='3116038007';
$celus[]='318563692';
$celus[]='3136315946';
$celus[]='3046663084';
$celus[]='3004716928';
$celus[]='3013759187';
$celus[]='3176710809';
$celus[]='3196118534';
$celus[]='3226585104';
$celus[]='3148879667';
$celus[]='3186195685';
$celus[]='3116751937';
$celus[]='3127332232';
$celus[]='3117318502';
$celus[]='3182673623';
$celus[]='3184327450';
$celus[]='3003744814';
$celus[]='3183472538';
$celus[]='3012315921';
$celus[]='3007818096';
$celus[]='3023553229';
$celus[]='3206192847';
$celus[]='3166650717';
$celus[]='3205765335';
$celus[]='3136487213';
$celus[]='3005695697';
$celus[]='3122980605';
$celus[]='3046442286';
$celus[]='3196790581';
$celus[]='3156628619';
$celus[]='3215139091';
$celus[]='3117901929';
$celus[]='3012699768';
$celus[]='3219737044';
$celus[]='3116442856';
$celus[]='3183394088';
$celus[]='3207007904';
$celus[]='3007453375';
$celus[]='3217936100';
$celus[]='3013109310';
$celus[]='3182096256';
$celus[]='3154863868';
$celus[]='3206228100';
$celus[]='3217532906';
$celus[]='3024521884';
$celus[]='3012044700';
$celus[]='3117258296';
$celus[]='3117612436';
$celus[]='3016438841';
$celus[]='3507646906';
$celus[]='3148696114';
$celus[]='3167266873';
$celus[]='3147819206';
$celus[]='3117648245';
$celus[]='3147690047';
$celus[]='3012939599';
$celus[]='3194113765';
$celus[]='3148313100';
$celus[]='3003139928';
$celus[]='3148135390';
$celus[]='3137259386';
$celus[]='3042562915';
$celus[]='3122603282';
$celus[]='3163151310';
$celus[]='3102216157';
$celus[]='3182803209';
$celus[]='3232272794';
$celus[]='3218860802';
$celus[]='3024196440';
$celus[]='3218809412';
$celus[]='3103200687';
$celus[]='3007398681';
$celus[]='3012372662';
$celus[]='3234586821';
$celus[]='3144540685';
$celus[]='3113808379';
$celus[]='3015485173';
$celus[]='3117464235';
$celus[]='3118305598';
$celus[]='3217722550';
$celus[]='3012372662';
$celus[]='3163483587';
$celus[]='3146891848';
$celus[]='3113722472';
$celus[]='3003168277';
$celus[]='3004294823';
$celus[]='3217398138';
$celus[]='3193297121';
$celus[]='3045986519';
$celus[]='3012043625';
$celus[]='3107027925';
$celus[]='3113886861';
$celus[]='3128325070';
$celus[]='3174395360';
$celus[]='3113882759';
$celus[]='3113851431';
$celus[]='3104917040';
$celus[]='3116491653';
$celus[]='3195509649';
$celus[]='3218755471';
$celus[]='3206474927';
$celus[]='3136161465';
$celus[]='3178005250';
$celus[]='3136458592';
$celus[]='3218003075';
$celus[]='573042841888';
$celus[]='3054485238';
$celus[]='3147057449';
$celus[]='3118582301';
$celus[]='3106336725';
$celus[]='3196165128';
$celus[]='573004630605';
$celus[]='3147305004';
$celus[]='3128129799';
$celus[]='3136226182';
$celus[]='573103717736';
$celus[]='3012856426';
$celus[]='3226758708';
$celus[]='3104017349';
$celus[]='3002834820';
$celus[]='3226997653';
$celus[]='3156223283';
$celus[]='3168218524';
$celus[]='3104439251';
$celus[]='3216858393';
$celus[]='3015621381';
$celus[]='3105184366';
$celus[]='3012593928';
$celus[]='3015109880';
$celus[]='3016187851';
$celus[]='3005020785';
$celus[]='3016600946';
$celus[]='3103149069';
$celus[]='3024568606';
$celus[]='3173634359';
$celus[]='3173878382';
$celus[]='3205718983';
$celus[]='3225861870';
$celus[]='3113545372';
$celus[]='3116728265';
$celus[]='3218128583';
$celus[]='3235805559';
$celus[]='3206865892';
$celus[]='3183976064';
$celus[]='3012413629';
$celus[]='3128826667';
$celus[]='573017105771';
$celus[]='3108470566';
$celus[]='3016736606';
$celus[]='3155873735';
$celus[]='3045475753';
$celus[]='3004629724';
$celus[]='3225829141';
$celus[]='3005700472';
$celus[]='3137650646';
$celus[]='3016501098';
$celus[]='3505334027';
$celus[]='3506373155';
$celus[]='3013424240';
$celus[]='3147424587';
$celus[]='3206415372';
$celus[]='3243624463';
$celus[]='3215527418';
$celus[]='3114945736';
$celus[]='3104668812';
$celus[]='3183027636';
$celus[]='3226421131';
$celus[]='3216218593';
$celus[]='3208320956';
$celus[]='3206440681';
$celus[]='3148532621';
$celus[]='3157507181';
$celus[]='3106304014';
$celus[]='3184410684';
$celus[]='3017145583';
$celus[]='3117042307';
$celus[]='3116397792';
$celus[]='3502673662';
$celus[]='3172793743';
$celus[]='3142186033';
$celus[]='3046559811';
$celus[]='3204577645';
$celus[]='3007682057';
$celus[]='3218874718';
$celus[]='3192911988';
$celus[]='7317822222';
$celus[]='3207173717';
$celus[]='3008381894';
$celus[]='3023694554';
$celus[]='3192948457';
$celus[]='3017391052';
$celus[]='3135304487';
$celus[]='3043846448';
$celus[]='3136857704';
$celus[]='3006365785';
$celus[]='3004883267';
$celus[]='3015026454';
$celus[]='3113726149';
$celus[]='3014860787';
$celus[]='3016606163';
$celus[]='3174048774';
$celus[]='3173966220';
$celus[]='3217640939';
$celus[]='3216335840';
$celus[]='3217733207';
$celus[]='3204756517';
$celus[]='3226753378';
$celus[]='3022470368';
$celus[]='3014575750';
$celus[]='3156165437';
$celus[]='3166596926';
$celus[]='3104640122';
$celus[]='3043697550';
$celus[]='3003933692';
$celus[]='3207845732';
$celus[]='3127606592';
$celus[]='3004936976';
$celus[]='3154128769';
$celus[]='3235017068';
$celus[]='3108127620';
$celus[]='3127112219';
$celus[]='3218477034';
$celus[]='3106476592';
$celus[]='3113017498';
$celus[]='3192182262';
$celus[]='3122941777';
$celus[]='3014947391';
$celus[]='3207301148';
$celus[]='3008409821';
$celus[]='3015027976';
$celus[]='3204066502';
$celus[]='3014596306';
$celus[]='3128923855';
$celus[]='3116052818';
$celus[]='3234643315';
$celus[]='3206185113';
$celus[]='3104168661';
$celus[]='3136308437';
$celus[]='3002278468';
$celus[]='3213511570';
$celus[]='3506396857';
$celus[]='3113421260';
$celus[]='3116603026';
$celus[]='3106424235';
$celus[]='3007803866';
$celus[]='3104447666';
$celus[]='3205949473';
$celus[]='3005762843';
$celus[]='3153511091';
$celus[]='3012976550';
$celus[]='3015112506';
$celus[]='3007736051';
$celus[]='3113101102';
$celus[]='3154610340';
$celus[]='3106887919';
$celus[]='3183636943';
$celus[]='3136699334';
$celus[]='3182577863';
$celus[]='3103416554';
$celus[]='3205555326';
$celus[]='3104363162';
$celus[]='3007237866';
$celus[]='3045809730';
$celus[]='3226346329';
$celus[]='3012559733';
$celus[]='3046138318';
$celus[]='3192761562';
$celus[]='3174025199';
$celus[]='3127839017';
$celus[]='3104697263';
$celus[]='3007758135';
$celus[]='3215915919';
$celus[]='3016157204';
$celus[]='3234445703';
$celus[]='3102052848';
$celus[]='3122343641';
$celus[]='3174401308';
$celus[]='3147832995';
$celus[]='3146690189';
$celus[]='3154656119';
$celus[]='3152585898';
$celus[]='3104212764';
$celus[]='3146072137';
$celus[]='3186278758';
$celus[]='3127808174';
$celus[]='3192156388';
$celus[]='3052250309';
$celus[]='3146880419';
$celus[]='3136809568';
$celus[]='3168780936';
$celus[]='3117883621';
$celus[]='3105195027';
$celus[]='3217522817';
$celus[]='3103743200';
$celus[]='3197886848';
$celus[]='3053416119';
$celus[]='3012533119';
$celus[]='3217048994';
$celus[]='3122867187';
$celus[]='3104518352';
$celus[]='3214415521';
$celus[]='3005246288';
$celus[]='3015233497';
$celus[]='3136585783';
$celus[]='3007716839';
$celus[]='3004998742';
$celus[]='3108650666';
$celus[]='3218544755';
$celus[]='3105715811';
$celus[]='3022548515';
$celus[]='3008243095';
$celus[]='3192416583';
$celus[]='3017706166';
$celus[]='3142432179';
$celus[]='3148505908';
$celus[]='3505831389';
$celus[]='3178628689';
$celus[]='3023694554';
$celus[]='3147190754';
$celus[]='3103731764';
$celus[]='3203958844';
$celus[]='3186497089';
$celus[]='3193977375';
$celus[]='3143556063';
$celus[]='3133043401';
$celus[]='3137026890';
$celus[]='3122930464';
$celus[]='3148317397';
$celus[]='3005876922';
$celus[]='3187995279';
$celus[]='3235840673';
$celus[]='3136398379';
$celus[]='3137800278';
$celus[]='3113851586';
$celus[]='3135093528';
$celus[]='3105958310';
$celus[]='3152834101';
$celus[]='3174193687';
$celus[]='3015778811';
$celus[]='3103621097';
$celus[]='3103965966';
$celus[]='3104070024';
$celus[]='3183016020';
$celus[]='3505959355';
$celus[]='3112290350';
$celus[]='3233019205';
$celus[]='3117852293';
$celus[]='3162418419';
$celus[]='3012730433';
$celus[]='3165714360';
$celus[]='3006052201';
$celus[]='3127128097';
$celus[]='3117494771';
$celus[]='3216037524';
$celus[]='3136020161';
$celus[]='3002668910';
$celus[]='3113427068';
$celus[]='3105992052';
$celus[]='3017927931';
$celus[]='3104425826';
$celus[]='3003121275';
$celus[]='3104498681';
$celus[]='3043924954';
$celus[]='3136215190';
$celus[]='3163202301';
$celus[]='3022161781';
$celus[]='3123303979';
$celus[]='3174330502';
$celus[]='3013966976';
$celus[]='3007047642';
$celus[]='3234839519';
$celus[]='3006009305';
$celus[]='3176609251';
$celus[]='3113385599';
$celus[]='3176989703';
$celus[]='3122988242';
$celus[]='3153451169';
$celus[]='3127435973';
$celus[]='3113665686';
$celus[]='3174342628';
$celus[]='3163229290';
$celus[]='3054399422';
$celus[]='3116753168';
$celus[]='3174342628';
$celus[]='3502931813';
$celus[]='3113475670';
$celus[]='3127282518';
$celus[]='3116174391';
$celus[]='3136448402';
$celus[]='3148179668';
$celus[]='3002800283';
$celus[]='3053345772';
$celus[]='3015476959';
$celus[]='3007763844';
$celus[]='3228510092';
$celus[]='3016679113';
$celus[]='3146345971';
$celus[]='3147504687';
$celus[]='3007765958';
$celus[]='3128842647';
$celus[]='3167530040';
$celus[]='3173778183';
$celus[]='3115513675';
$celus[]='3114947416';
$celus[]='3017041420';
$celus[]='3148072895';
$celus[]='3104656129';
$celus[]='3104133735';
$celus[]='3217838916';
$celus[]='3148445944';
$celus[]='3113147138';
$celus[]='3127840234';
$celus[]='3168265737';
$celus[]='3042052000';
$celus[]='3155547475';
$celus[]='3193720633';
$celus[]='3174362837';
$celus[]='3505193411';
$celus[]='3216032041';
$celus[]='3136352353';
$celus[]='3008907265';
$celus[]='3103934766';
$celus[]='3107464953';
$celus[]='3104003861';
$celus[]='3113699922';
$celus[]='3007344452';
$celus[]='3113759471';
$celus[]='3015025099';
$celus[]='3014045928';
$celus[]='3173737657';
$celus[]='3023359496';
$celus[]='3008632480';
$celus[]='0000000000';
$celus[]='3105286259';
$celus[]='3023577254';
$celus[]='3104395472';
$celus[]='3042911620';
$celus[]='3184390962';
$celus[]='3103694587';
$celus[]='3196490817';
$celus[]='3228510092';
$celus[]='3127339515';
$celus[]='3215580495';
$celus[]='3117773805';
$celus[]='3218391636';
$celus[]='3175478162';
$celus[]='3229060322';
$celus[]='3148889608';
$celus[]='3218380969';
$celus[]='3007339287';
$celus[]='3104034440';
$celus[]='3117461693';
$celus[]='3188216456';
$celus[]='3128426068';
$celus[]='3163894967';
$celus[]='3041301120';
$celus[]='3218449870';
$celus[]='3173820834';
$celus[]='3205217014';
$celus[]='3012059088';
$celus[]='3167579352';
$celus[]='3103723196';
$celus[]='3205504987';
$celus[]='3138275040';
$celus[]='3114166410';
$celus[]='3106328218';
$celus[]='3506244297';
$celus[]='3122246949';
$celus[]='3023295649';
$celus[]='3203350428';
$celus[]='3012098370';
$celus[]='3128433921';
$celus[]='3114138221';
$celus[]='3205646546';
$celus[]='3232082074';
$celus[]='3007729254';
$celus[]='3106677270';
$celus[]='3106159498';
$celus[]='3207578640';
$celus[]='3158296473';
$celus[]='3024623263';
$celus[]='3104247070';
$celus[]='3174389624';
$celus[]='3206542425';
$celus[]='3116125971';
$celus[]='3128420129';


// definimos el cursor
    if($cursorXX){
        $cursor = $cursorXX;
    }else{
        $cursor = 1;
	}  
        
    $contador = 0;



// blucle para contar cantidad de registros a procesar
while($contador < 100){

    if($celus[$cursor]){
        
    }else{
        die('termino');
    }
    
    echo "<hr>";
    //echo $celus[$cursor];
    // tamamos la informacion del usuario de la db
    $cliente = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `campo_10` = '".$celus[$cursor]."' ; ","id,campo_3,campo_5,campo_8,campo_9,campo_10,campo_26,campo_4,campo_24,campo_64,campo_83,campo_19,campo_29,campo_31",$modular_dir."/config/".$modular_ap_name_config.".php");

    // cruzmos el asesor
    // echo "<hr>id_cliente:".$cliente['id']."<hr>";
    $asesor = MEGA_mySQL_R("SELECT * FROM `suscripcion_post` WHERE `id` = '".$cliente['campo_64']."' ; ","campo_1,campo_3,campo_10,campo_26,campo_4,campo_24,campo_64",$modular_dir."/config/".$modular_ap_name_config.".php");

    // consultamos las tareas del cliente
    unset($requerimientos);
    $sql_historial = '';
    $consulta = mysql_query("SELECT * FROM `requerimientos` WHERE `personal_ext` = '-".$cliente['id']."-' AND (`estado` = 'En_proceso' OR  `estado` = 'Sin_iniciar') ORDER BY `id` DESC ",$db);
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

            
            $historial_total .= '<hr><div class="M21_req_historial">
                <strong>'.$datos['nombre'].'</strong>
                <div class="M21_req_historial_data">
                '.M21_mkfecha_humano($datos['fecha_timeStamp']).'
                <br />
                <span style="color:#666666; font-size:8px">'.$hace_x_tiempo.' antes</span>                
                </div>          
              
                <div class="M21_req_historial_datalle">
                '.$datos['estado'].'              
                <span class="titulo_pn">Observaciones / Comentarios:</span><br />
                '.$datos['observaciones'].'<br /><br />
                </div>
          </div>';  
        }
    }

    
    $historial_total = utf8_encode($historial_total);
    $historial_total = base64_encode($historial_total);
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
        "'.$celus[$cursor].'"'.$tels.'
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



?>
<!-- <meta http-equiv="refresh" content="0; url=/v2_base/index.php?sub_cat=CV_migra_prospectos_activos&cursorXX=<? echo $cursor ?>"> -->
<?

    
    echo "<hr>";

    $_GET['M21_exe_time'] = $obj->obtener_tiempo(); 
    echo $_GET['M21_exe_time'] ;
    
die();



        