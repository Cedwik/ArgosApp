
<?
mysql_connect('mysql51-104.perso','argosappsql','ilest11h29');
mysql_select_db('argosappsql'); // on se connecte à MySQL.

$query = mysql_query("SELECT nom_lieu FROM retro_lieu WHERE arrondissement LIKE '%1er arrondissement%' ORDER BY nom_lieu") or die (mysql_error()); // la requête pour afficher seulement les lieux du 1er arrondissement



?>