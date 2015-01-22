<?php  
$api_key = "21232f297a57a5a743894a0e4a801fc3";


$headers = getallheaders();

$_REQUEST["api_key"] = $headers["api_key"];

print_r($_GET);

$curl = curl_init($headers["endpoint"]);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);


if ($_POST) {
	curl_setopt($curl, CURLOPT_POST, true);
} else if ($_PUT) {
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
} else if ($_DELETE) {
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
}

curl_setopt($curl, CURLOPT_POSTFIELDS, $_REQUEST);

$curl_response = curl_exec($curl);

if ($curl_response === false) {
    $info = curl_getinfo($curl);
    curl_close($curl);
    die('error occured during curl exec. Additioanl info: ' . var_export($info));
}
curl_close($curl);

die($curl_response);