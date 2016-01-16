<?php
session_start();
ob_start();
include_once('config.php');
$id = $_SESSION["idPerson"];
$idvideo = $_REQUEST["curVideo"];
$newstate = $_REQUEST["newState"];
$sql = "UPDATE `allocation` SET `idstatevideo`='".$newstate."' WHERE `allocation`.`idvideo`= '".$idvideo."' AND `allocation`.`idperson` = '".$id."'";
if($result = $mysqli->query($sql)){
	echo "sucess";
}else{
	echo $mysqli->error;
}
?>