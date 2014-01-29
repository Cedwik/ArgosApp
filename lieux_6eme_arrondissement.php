
<?
mysql_connect('mysql51-104.perso','argosappsql','ilest11h29');
mysql_select_db('argosappsql'); // on se connecte à MySQL.

$query = mysql_query("SELECT nom_lieu FROM retro_lieu WHERE arrondissement LIKE '%6eme arrondissement%' ORDER BY nom_lieu") or die (mysql_error()); // la requête pour afficher seulement les lieux du 1er arrondissement

echo'<ul>';
	while($donnees = mysql_fetch_array($query)) // on fait un while pour afficher la liste des fonctions trouvées, ainsi que l'id qui permettra de faire le lien vers la page de la fonction
	{
	echo "<li>";
	echo($donnees['nom_lieu']);

} // fin de la boucle
echo'</ul>';
?><br/>

