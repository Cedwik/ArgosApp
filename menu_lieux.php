



<!--formulaire pour permettre à l'utilisateur d'entrer les mots clés de sa recherche -->

<html>

<form action="menu_lieux.php" method="post">
<input type="button" name="az" value="De A à Z" />
<input type="button" name="typeperso" value="Par type de personnage" />
</form>

</html>

<?			
	mysql_connect('mysql51-104.perso','argosappsql','ilest11h29');
	mysql_select_db('argosappsql'); // on se connecte à MySQL. 
	$az = $_POST["az"];
	$typeperso = $_POST["typeperso"];
?>

<?php
	
			$result = mysql_query("SELECT id, nom_lieu FROM retro_lieu ORDER BY nom_lieu") or die (mysql_error());
			
			echo "<ul>";
			while($row=mysql_fetch_array($result)){
				echo "<li>";
				echo($row["id"]);
				echo " ";
				echo($row["nom;_lieu"]);
				echo "</li>";
			}
			echo "</ul>";
 ?> 

