<?php
session_start();
ob_start();
include_once('config.php');
$id = $_SESSION["idPerson"];
$idvideo = $_REQUEST["idVideo"];
$sql = "SELECT `lastTime` FROM `allocation` WHERE `idperson`='".$id."' AND `idvideo` ='".$idvideo."'";
if($result = $mysqli->query($sql)){
	if ($row = $result->fetch_assoc()) {
		echo $row["lastTime"];
	}
}else{
	echo $mysqli->error;
}
?>