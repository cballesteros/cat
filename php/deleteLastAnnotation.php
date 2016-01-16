<?php
session_start();
ob_start();
include_once('config.php');
$sql = "DELETE FROM `anotation` ORDER BY `idanotation` DESC LIMIT 1";
$result_annotation = $mysqli->query($sql);
echo $mysqli->error." - ".$result_annotation;
?>