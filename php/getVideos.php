<?php
session_start();
ob_start();
include_once('../php/config.php');
$id = $_SESSION["idPerson"];
$sql = "SELECT * FROM allocation, video WHERE idperson='".$id."' AND allocation.idvideo = video.idvideo";
$infoAllVideos="";
if($result = $mysqli->query($sql)){
	while ($row = $result->fetch_assoc()) {
		$infoVideo = $row["idvideo"].";".$row["idstatevideo"].";".$row["link"].";".$row["lastTime"];
		$infoAllVideos .= $infoVideo."_";
	}
	echo $infoAllVideos;
}else{
	echo $mysqli->error;
}
?>