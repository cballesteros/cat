<?php
session_start();
ob_start();
include_once('config.php');
$id = $_SESSION["idPerson"];
$idvideo = $_REQUEST["curVideo"];
$sql = "SELECT * FROM `anotation` WHERE `person_idperson`='".$id."' AND `video_idvideo`='".$idvideo."' ORDER BY `idanotation` ASC";
$annotationsID="";
$diagnosis="";
if($result = $mysqli->query($sql)){
	while ($row = $result->fetch_assoc()) {
		$annotationsID .= $row["idanotation"].";";
		$diagnosis .= $row["iddiagnosisvideoframe"].";";
	}
	echo $annotationsID."_".$diagnosis;
}else{
	echo $mysqli->error;
}
?>