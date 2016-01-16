<?php
session_start();
ob_start();
include_once('config.php');
$idVideo = $_REQUEST["curVideo"];
$sql = "SELECT * FROM `video` WHERE `idvideo`='".$idVideo."'";
$infoVideo="";
if($result = $mysqli->query($sql)){
	if ($row = $result->fetch_assoc()) {
		$sql_hospital = "SELECT `description` FROM `hospital` WHERE `idhospital`=".$row["idHospital"];
		$infoVideo = $row["clinichistory"].";".$row["examreason"].";".$row["age"].";".$row["gende"].";";
		if($result2 = $mysqli->query($sql_hospital)){
			$infoVideo .= $result2->fetch_assoc()["description"];
		}
	}
	echo $infoVideo;
}else{
	echo $mysqli->error;
}
?>