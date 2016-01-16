<?php
session_start();
ob_start();
include_once('config.php');
$timeBlue = $_REQUEST["blue"];
$timeRed = $_REQUEST["red"];
$diagnosis = $_REQUEST["diagnosis"];
$idvideo = $_REQUEST["curVideo"];
$currentdate = date("Y-m-d h:i:s");
$id = $_SESSION["idPerson"];
$query_annotation = "INSERT INTO `anotation` (`idanotation`, `starttime`, `endtime`, `besttime`, `dateanotation`, `iddiagnosisvideoframe`, `video_idvideo`, `person_idperson`) VALUES (NULL,'".$timeBlue."','".$timeRed."',"."NULL".",'".$currentdate."','".$diagnosis."','".$idvideo."','".$id."')";
$result_annotation = $mysqli->query($query_annotation);
echo $mysqli->error." - ".$query_annotation;
?>