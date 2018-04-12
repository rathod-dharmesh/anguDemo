<?php

use \App\Models\Footer;
use \App\Models\Settings;
use \App\Models\User;

function get_constant_value($key_value ='', $default=''){
  if($key_value=='') return '';
    if(Footer::select('meta_value')->where('meta_key', $key_value)->count()==0) return '';
  return Footer::select('meta_value')->where('meta_key', $key_value)->first()->meta_value;
}

function update_constant_value($key ='', $value=''){
  if($key=='') return '';
  $constant = Footer::where('meta_key', $key)->first();
  if(!$constant){
    $constant=Footer::create(['meta_key'=>$key]);
  }
  $constant->meta_value = $value;
    return $constant->save();
}

function get_option($key){
  if($key=='') return '';
  $constant = Settings::where('name', $key)->first();
  if($constant){
    return $constant->field;
  }else{
    return null;
  }
}

function check_and_return_image_upload($rawfile, $default){
    if (starts_with($rawfile, 'data:image'))
        return uplaod_raw_image($rawfile);
    else
        return $default;
}

function get_uploaded_path($value){
    return str_replace('/public/index.php','',URL::to($value));
}

function get_storage_link($value = '', $type=0){

    if($type = 1) $value = 'public/'.str_replace('public/', '', $value);
    return str_replace('/public/index.php','',URL::to($value));
}

function get_storage_link_api($value, $type=0){
  if($type = 1) $value = 'public/'.$value;
  $value = str_replace('/public/index.php','',URL::to($value));
    return str_replace('public/','public',$value);
}

function uplaod_raw_image($value, $destination_path = '', $disk='')
{ 
    $attribute_name = "image";
    if($disk == '') $disk = "public";
    if($destination_path == '') $destination_path =  'uploads';

    // if the image was erased
    if ($value==null) {
        // delete the image from disk
        // \Storage::disk($disk)->delete($this->image);

        // set null in the database column
        return  null;
    }

    // if a base64 was sent, store it in the db
    if (starts_with($value, 'data:image'))
    {
        $pos  = strpos($value, ';');
        $type  = explode(':', substr($value, 0, $pos))[1];
        $type  = str_replace("image/", "", $type);
        // 0. Make the image
        $image = \Image::make($value);
        // 1. Generate a filename.
        $filename = md5($value.time()).'.'.$type;
        // 2. Store the image on disk.
        $destination_path.'/'.$filename;
        \Storage::disk($disk)->put($destination_path.'/'.$filename, $image->stream());
        // 3. Save the path to the database
        $attribute_name = $destination_path.'/'.$filename;
    }elseif(is_object($value)){
            //$filename = md5($value.time()).'.jpg';
            $filename = md5($value.time()).$value->getClientOriginalName();
            $value->storeAs($destination_path, $filename, $disk);

            //$value->storeAs($destination_path, $filename, $disk);

            $attribute_name = $destination_path.'/'.$filename;
        }
    return "public/".$attribute_name;
}


function maybe_unserialize( $original ) {
      if (is_serialized( $original ) ) // don't attempt to unserialize data that wasn't serialized going in
        return @unserialize( $original );
      return $original;
    }

    function maybe_serialize( $data ) {
      if ( is_array( $data ) || is_object( $data ) )
          return serialize( $data );
      if (is_serialized($data))
          return serialize( $data );
      return $data;
    }

    function is_serialized($value, &$result = null)
    {
    // Bit of a give away this one
        if (!is_string($value))
        {
          return false;
        }
        // Serialized false, return true. unserialize() returns false on an
        // invalid string or it could return false if the string is serialized
        // false, eliminate that possibility.
        if ($value === 'b:0;')
        {
          $result = false;
          return true;
        }
        $length = strlen($value);
        $end  = '';
        switch ($value[0])
        {
          case 's':
            if ($value[$length - 2] !== '"')
            {
              return false;
            }
          case 'b':
          case 'i':
          case 'd':
            // This looks odd but it is quicker than isset()ing
            $end .= ';';
          case 'a':
          case 'O':
            $end .= '}';
            if ($value[1] !== ':')
            {
              return false;
            }
            switch ($value[2])
            {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
              case 8:
              case 9:
              break;
              default:
                return false;
            }
          case 'N':
            $end .= ';';
            if ($value[$length - 1] !== $end[0])
            {
              return false;
            }
          break;
          default:
            return false;
        }
        if (($result = @unserialize($value)) === false)
        {
          $result = null;
          return false;
        }
        return true;
    }
    function getSql(\Illuminate\Database\Eloquent\Builder $model){ 
    function replace ($sql, $bindings) 
    { 
        $needle = '?'; 
        foreach ($bindings as $replace){ 
            $pos = strpos($sql, $needle); 
            if ($pos !== false) { 
                $sql = substr_replace($sql, $replace, $pos, strlen($needle)); 
            } 
        } 
        return $sql; 
    } 
    $sql = replace($model->toSql(), $model->getBindings()); 
    
    return $sql; 
}

//mail function

function get_mail_template($args=""){
  
  if(empty($args))
    return false;

  $results=Settings::find($args);
  if(!empty($results)){
        return json_decode(json_encode($results));
    }else{
      return false;
    }
}
// function send_mail($to, $mail_template_id, $data=array(), $from = "dharmeshrathod3850@gmail.com", $debug = false, $subject){

  

  
//   if(is_array($from)){
//     $from_email = $from['email'];
//     $from_name = $from['name'];
//   }else{
//     if(strpos($from, '@') !== false){
//       $from_email = $from;
//       $from_name = get_option('from_name');
//     }else{
//       $from_email = get_option('from_email');
//       $from_name = $from != "" ? $from : get_option('from_name');
//     }
//   }

//   $default_data = array(
//     'header' => filter_content(get_option('mail_header'),$data, 'both', true),
//     'footer' => filter_content(get_option('mail_footer'),$data, 'both', true),
//   );

//   $data = array_merge($default_data, $data);

//   if(is_numeric($mail_template_id)){
//     $template = get_mail_template($mail_template_id);


//     $subject = filter_content($template->description, $data, 'both', true);
//     $message = filter_content($template->field, $data, 'both', true);
//   }

//   else{
//     $subject = $subject;
//     $message = $mail_template_id;
//   }
//   if(empty($to)){
//     $to = "anypol789@gmail.com";
//   }


//   Mail::send('emails.default', ['message_data' => $message], function ($mail) use ($to, $from_email, $from_name, $subject) {
//       $mail->from($from_email, $from_name);
//       $mail->to($to)->subject($subject);
//   });

//   return true;
// }









function filter_content($message, $data, $var_prefix = false, $sub = false){
    

    if(!is_array($data)){
      if(empty($data))
        $data = array();
      else
        $data = (array)$data;
    }

    return filter_msg($message,$data, $var_prefix, $sub);
  }
  function filter_msg($msg,$values, $var_prefix = false, $sub = false){
    $values = (array)$values;
    
    if($var_prefix === true){
      preg_match_all("/\{\\$([a-zA-Z_\x7f-\xff][a-z-A-Z0-9_\x7f-\xff]*)\}/",$msg,$matches);
    }else{
      preg_match_all("/\{([a-z\$A-Z_\x7f-\xff][a-z-A-Z0-9_\x7f-\xff]*)\}/",$msg,$matches);
      //preg_match_all("/\{([a-zA-Z_\x7f-\xff][a-z-A-Z0-9_\x7f-\xff]*)\}/",$msg,$matches);
    }
    foreach ($matches[0] as $key => $var_name) {
      $k = $matches[1][$key];
      $k = trim($k, '$');
      if($sub != false && !isset($values[$k])){
          $sub = $sub === true ? "-" : $sub;
          $sub_var_args = explode($sub, $k);

          $val = $values;
          foreach ($sub_var_args as $value) {
            if(is_object($val)){
              $val = (array)$val;
            }
            if(isset($val[$value])){
              $val = $val[$value];
            }else{
              $val = "";
            }
          }

        }else{
          $val = $values[$k];
        }


        $msg = str_replace($var_name, $val, $msg);
    }
    return $msg;
  }
function generate_random_password()
{
  $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $password = substr( str_shuffle( $chars ), 0, 12 );
    return $password;
}



function createPath($path) {
      if (is_dir($path)) return true;
      $prev_path = substr($path, 0, strrpos($path, '/', -2) + 1 );
      $return = createPath($prev_path);
      if(!is_writable($prev_path)){
        chmod($prev_path, 0777);
      }
      return ($return && is_writable($prev_path)) ? mkdir($path, 0777, true) : false;


}
//end mail function
function get_country(){
  return $country = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Myanmar/Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominican Republic", "Dominica", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "French Guiana", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Great Britain", "Greece", "Grenada", "Guadeloupe", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Israel and the Occupied Territories", "Italy", "Ivory Coast (Cote d'Ivoire)", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kosovo", "Kuwait", "Kyrgyz Republic (Kyrgyzstan)", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Republic of Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Korea, Democratic Republic of (North Korea)", "Norway", "Oman", "Pacific Islands", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent's & Grenadines", "Samoa", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovak Republic (Slovakia)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Korea, Republic of (South Korea)", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor Leste", "Togo", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos Islands", "Uganda", "Ukraine", "United Arab Emirates", "United States of America (USA)", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (UK)", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
}

function timezone_list(){
    return $timezone = ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chihuahua", "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Kralendijk", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Lower_Princes", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Montreal", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nipigon", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Ojinaga", "America/Panama", "America/Pangnirtung", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Velho", "America/Puerto_Rico", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Santa_Isabel", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok", "Arctic/Longyearbyen", "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Choibalsan", "Asia/Chongqing", "Asia/Colombo", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Gaza", "Asia/Harbin", "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kashgar", "Asia/Kathmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qyzylorda", "Asia/Rangoon", "Asia/Riyadh", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Thimphu", "Asia/Tokyo", "Asia/Ulaanbaatar", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yekaterinburg", "Asia/Yerevan", "Asia/kalata", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faroe", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Currie", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/Perth", "Australia/Sydney", "Europe/Amsterdam", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Uzhgorod", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zaporozhye", "Europe/Zurich", "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", "Indian/Reunion", "Pacific/Apia", "Pacific/Auckland", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Wake", "Pacific/Wallis","Europe/Andorra", "UTC"];
}


function set_timezone($curr_datetime, $req_timezone = '', $format = 'Y-m-d H:i:s')
{
    $timezone = new DateTimeZone($req_timezone);
    $UTC = new DateTimeZone('UTC');
    $date = date('Y-m-d H:i:s',strtotime($curr_datetime));
    $dt = new DateTime($date, $timezone);
    $set_timezone = $dt->setTimezone($UTC);
    $set_date = $set_timezone->format($format);
    return $set_date;
}

function get_timezone($curr_datetime, $req_timezone = '', $format = 'Y-m-d H:i:s')
{
    $timezone = new DateTimeZone($req_timezone);
    $UTC = new DateTimeZone('UTC');
    $date = date('Y-m-d H:i:s',strtotime($curr_datetime));
    $dt = new DateTime($date, $UTC);
    $set_timezone = $dt->setTimezone($timezone);
    $get_date = $set_timezone->format($format);
    return $get_date;
}