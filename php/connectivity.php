<?php
session_start();
ob_start();
include_once('config.php');

$query = "SELECT * FROM person WHERE user = '$_POST[user]' AND pass = '$_POST[pass]'";
$result = $mysqli->query($query);

if($mysqli->affected_rows >= 1)
{
	if($row = $result->fetch_assoc()){
		$_SESSION["namePerson"] = $row["name"];
		$_SESSION["idPerson"] = $row["idperson"];
		header( "Location: /app");
	}else{
		header( "Location: /" );
	}
}
else
{
	header( "Location: /cat" );
}

/* free result set */
$result->free();

/* close connection */
$mysqli->close();

?>

