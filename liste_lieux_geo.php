<?php 

$server = "mysql51-104.perso";
$username = "argosappsql";
$password = "ilest11h29";
$database = "argosappsql";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);
	mysql_query("SET NAMES UTF8");
$selectInfoLieu = "SELECT*FROM retro_lieu, retro_type_lieu WHERE latitude != 0 AND retro_lieu.type = retro_type_lieu.id";

$requeteInfo = mysql_query($selectInfoLieu, $con);

	$markers = array();
	
	
	
	
	while($row = mysql_fetch_assoc($requeteInfo)) {
	$markers[] = $row;
	}
	echo $_GET['jsoncallback'] . '(' . json_encode($markers) . ');';
	
?>