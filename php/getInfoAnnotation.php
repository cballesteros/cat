<?php
session_start();
ob_start();
include_once('config.php');
$id = $_REQUEST["idAnnotation"];
$sql = "SELECT * FROM `anotation` WHERE `idanotation`='".$id."'";
$infoAnnotation="";
if($result = $mysqli->query($sql)){
	while ($row = $result->fetch_assoc()) {
		$infoAnnotation = $row["starttime"]."-".$row["endtime"];
	}
	echo $infoAnnotation;
}else{
	echo $mysqli->error;
}
?>