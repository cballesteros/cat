<?php
session_start();
ob_start();
include_once('config.php');
$starttime = $_REQUEST["starttime"];
$endtime = $_REQUEST["endtime"];
$idannotation = $_REQUEST["idannotation"];
$idvideo = $_REQUEST["curVideo"];
$iddiagnosis = $_REQUEST["diagnosis"];
$idperson = $_SESSION["idPerson"];
$sql = "UPDATE `cat_db`.`anotation` SET `starttime` = '".$starttime."', `endtime` = '".$endtime."', `iddiagnosisvideoframe` = '".$iddiagnosis."' WHERE `anotation`.`idanotation` = '".$idannotation."' AND `anotation`.`video_idvideo` = '".$idvideo."' AND `anotation`.`person_idperson` = '".$idperson."';";

if($result = $mysqli->query($sql)){
	echo "sucess";
}else{
	echo $mysqli->error;
}
?>