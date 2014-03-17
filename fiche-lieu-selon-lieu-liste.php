<?php
header("Access-Control-Allow-Origin: *");              // Tous les domaines

$server = "mysql51-104.perso";
$username = "argosappsql";
$password = "ilest11h29";
$database = "argosappsql";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);
mysql_query("SET NAMES UTF8"); //résoud le pb d'encodage: affiche les données avec accents retourner par le serveur

if (isset($_GET['idlieu'])) {
  // do stuff with M here 
  $idlieu = $_GET['idlieu'];
}

//on sélectionne les infos du lieu dont l'id du lieu est celui correspondant à l'id du lieu choisi par l'utilisateur (au clic)
$requete="SELECT * FROM retro_lieu, retro_commentaire WHERE retro_lieu.id='$idlieu' AND retro_commentaire.id_lieu_com='$idlieu'";
$resultlieu = mysql_query($requete) or die ("Query error: " . mysql_error());
$infoslieu = array();

while($row = mysql_fetch_assoc($resultlieu)) {
	$infoslieu[] = $row;
}




	
echo $_GET['callback'] . '(' . json_encode($infoslieu) . ');'; //pour renvoyer à JQuery via data

mysql_close($con);
?>
