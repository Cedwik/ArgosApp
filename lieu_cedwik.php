<?php
$server = "mysql51-104.perso";
$username = "argosappsql";
$password = "ilest11h29";
$database = "argosappsql";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);
mysql_query("SET NAMES UTF8"); //résoud le pb d'encodage: affiche les données avec accents retourner par le serveur
$id_lieu = $_GET['id_lieu'];
$requete="SELECT * FROM retro_lieu WHERE id = $id_lieu";
$resultlieu = mysql_query($requete) or die ("Query error: " . mysql_error());
$lieu = array();

while($row = mysql_fetch_assoc($resultlieu)) {
	$lieu[] = $row;
}

	
echo $_GET['jsoncallback'] . '(' . json_encode($lieu) . ');';

mysql_close($con);
?>
