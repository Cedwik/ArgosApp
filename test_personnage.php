


<p>Recherche par personnage :</p>
<!--formulaire pour permettre � l'utilisateur d'entrer les mots cl�s de sa recherche -->
<form action="test_personnage.php" method="Post">
<input type="text" name="recherche" size="10">
<input type="submit" value="Ok">
</form>

<?

$recherche = $_POST["recherche"];

if(isset($_POST['recherche']) && $_POST['recherche'] != NULL) // on v�rifie d'abord l'existence du POST et aussi si la requete n'est pas vide.
{
mysql_connect('mysql51-104.perso','argosappsql','ilest11h29');
mysql_select_db('argosappsql'); // on se connecte � MySQL. Je vous laisse remplacer les diff�rentes informations pour adapter ce code � votre site.
$recherche = htmlspecialchars($_POST['recherche']); // on cr�e une variable $requete pour faciliter l'�criture de la requ�te SQL, mais aussi pour emp�cher les �ventuels malins qui utiliseraient du PHP ou du JS, avec la fonction htmlspecialchars().
$query = mysql_query("SELECT id, prenom, nom FROM retro_personnage WHERE prenom LIKE '%$recherche%' OR nom LIKE '%$recherche%' ORDER BY prenom") or die (mysql_error()); // la requ�te, que vous devez maintenant comprendre ;)
$nb_resultats = mysql_num_rows($query); // on utilise la fonction mysql_num_rows pour compter les r�sultats pour v�rifier par apr�s
if($nb_resultats != 0) // si le nombre de r�sultats est sup�rieur � 0, on continue
{
// maintenant, on va afficher les r�sultats et la page qui les donne ainsi que leur nombre, avec un peu de code HTML pour faciliter la t�che.
?>
<h3>R�sultats de votre recherche :</h3>
<p><? echo $nb_resultats;// on affiche le nombre de r�sultats ?>  
<? if($nb_resultats > 1) { echo 'personnages trouv�s'; echo ' '; } else { echo 'personnage trouv�'; echo ' '; } // on v�rifie le nombre de r�sultats pour orthographier correctement. 
?>
<br/>
<br/>
<?
while($donnees = mysql_fetch_array($query)) // on fait un while pour afficher la liste des fonctions trouv�es, ainsi que l'id qui permettra de faire le lien vers la page de la fonction
{
?>
<a href="fonction.php?id=<? echo $donnees['id']; ?>"><? echo $donnees['prenom']; ?><? echo " "; ?><? echo $donnees['nom']; ?></a><br/>
<?
} // fin de la boucle
?><br/>

<?
} // Fini d'afficher les r�sultats ! Maintenant, nous allons afficher l'�ventuelle erreur en cas d'�chec de recherche et le formulaire.
else
{ // de nouveau, un peu de HTML
?>
<h3>Pas de r�sultats</h3>
<p>Nous n'avons trouv� aucun r�sultat pour votre recherche "<? echo $_POST['recherche']; ?>". <a href="test_personnage.php">R�essayez</a> avec autre chose.</p>
<?
}// Fini d'afficher l'erreur ^^
mysql_close(); // on ferme mysql, on n'en a plus besoin
}
else
{ // et voil� le formulaire, en HTML de nouveau !
?>

<?
}
// et voil�, c'est fini !
?>