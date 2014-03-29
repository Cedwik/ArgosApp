	//masquer la partie "résultat de la recherche")
	$('.resultat-titre').hide();
	$('.contenu_recherche').hide();
	$('#ul_liste_persoAZ').show();
	
	//Quand on clique sur "De A à Z", on affiche la liste des personnages de A à Z et on masque le résultat de recherche
	$('#li_a_z').click(function() {
		$('#ul_liste_persoAZ').show();
		$('.resultat-titre').hide();
		$('.contenu_recherche').hide();
	});
	
	
	$('#search-bar').submit(function(){
		//on affiche le titre "Résultat recherche"
		$('.resultat-titre').show();
		$('.resultat-titre').html("Résultat recherche");
		$('.contenu_recherche ul').html("Les Rétro Personnages : ");
		
	
		        // je récupère les valeurs
        var searchkey = $('#searchkey').val();
		//alert("Vous allez chercher : "+searchkey);
 
        // je vérifie une première fois pour ne pas lancer la requête HTTP
        // si je sais que mon PHP renverra une erreur
        if(searchkey == '') {
            alert('Saisissez un mot clé !');
			searchkey.remove();
        } else {
	
                var postSearch = $(this).serialize();

                $.ajax({
                        type: 'GET',
						dataType: 'jsonp',
                        data: postSearch,
                        url: 'http://www.argosapps.fr/retro_php_server/cherche-perso.php?callback=?',
                        success: function(data){
                                //do your thing
                                console.log('Recherche perso ok !');
								
								//on cache toutes les autres listes de la page :
								$('#ul_liste_persoAZ').hide();
								//$('#liste_persotype li').hide();
								
									$('.contenu_recherche').show();
														
									$.each(data, function(i, item) {
										
										//alert(item.prenom+" "+item.nom);
										//on affiche le nom et le prénom sous forme de liste suite à la recherche
										$('.contenu_recherche ul').append('<li><a id="'+item.id+'" href="#" rel="external"><img src="'+item.icone_perso+'" alt=""/>'+item.nom+' '+item.prenom+'</a></li><div id="fiche-perso-'+item.id+'"></div>');
										$('#recherche-resultat ul').listview('refresh');
						
										
									});
									
									var nbresults = $('.contenu_recherche ul li').length;
									alert(nbresults);
									$('.nb-resultats').html(nbresults+" correspondent à votre recherche !");
									
									//afficher les fiches selon le personnage issus de la recherche, qu'on a chosii :
									
				//au clic sur un des personnages de la recherche, on va récupérer les infos de ces personnages
				 $('.contenu_recherche ul li a').click(function(e) {
				
					//on va masquer tous les div au départ(contenant les fiches persos)
					$('.contenu_recherche ul div').hide();
				
							// event.preventDefault();
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idperso
							var idperso = $(this).attr('id');

						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/fiche-perso-selon-perso-liste.php?callback=?',
								data: ({'idperso' : idperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idperso']
								success: function(data){
								
									console.log('Succès fiche perso !');
									console.log(data); //on récupère bien les infos sur le personnage choisi
									$.each(data, function(i, item) {
									
									//On prépare
									var $divperso = '#fiche-perso-' + idperso;
									//alert($divperso);
									$($divperso).show();
									$($divperso).html("<div data-role='content'>"+
										"<div id='page_title'>"+
										"<a href='index.html' data-role='button' data-icon='bouton_l' data-iconpos='notext' data-rel='back'>Retour</a>"+
											"<h1 id='nom_pero'></h1><!--A CHANGER SELON LE NOM-->"+
										"</div><!-- /page_title -->"+

									"<!--photo + date-->"+	
										"<div id='info'>"+
											"<img src='img/img-albert-camus.png' alt='' />"+
											"<div id='type-perso-zone'>"+
												"<!-- type ici du perso et icone -->"+
											"</div>"+
											"<p class='small-font dates'></p><!--A CHANGER SELON LE NOM-->"+
											"<p id='origine' class='small-font'></p>"+
										"</div>"+
										
										"<div id='perso-aime'>"+
											"<img src='img/icone-coeur.png' alt='' />"+
											"<ul>"+
												"<!--<li>l'engagement</li>"+
												"<li>les combats moraux</li>"+
												"<li>l'humanisme</li>-->"+
											"</ul>"+
										"</div>"+
										

										"<div id='description-zone'>"+
										"<h3 class='small-font'>Rétrospective sur son histoire !</h3>"+
									"<!--biographie-->	<!--A CHANGER SELON LE NOM-->"+
										"<div id='biographie'>"+
										"<h4 class='vie'>Sa vie</h4>"+
										"<p id='savie-txt'></p>"+
										"<h4 class='perso-paris'>Lui et Paris !</h4>"+
										"<p id='perso-paris-txt'></p>"+
										"</div><!-- /bio-->"+
										"</div>"+
										
									"<br />"+
									"<!--Oeuvres-->"+
										"<div id='oeuvres' class='rose'><h3><span class='bold'>Ses oeuvres</span></h3>"+
											"<img src='img/icone-cadis.png' class='icone' alt='' />"+
											"<ul><!--LI A CHANGER SELON BDD-->"+
											"<li id='amazon'><h4>Acheter sur Amazon</h4> <img src='img/perso/amazon.png' alt='' /></li>"+
												"<ul id='detail-oeuvres'>"+
												"<!--<li><a href='#'>L'Étranger (1942)</a></li>	"+
												"<li><a href='#'>La Peste (1947)</a></li>-->	"+
												"</ul>"+
											"</ul>"+
										"</div> <!-- /Oeuvres -->"+

									"<br/>"+

									"<!--Lieu fréquenté-->"+
										"<div id='lieu_frequente' class='rose alinea'>"+
										"<h3><span class='bold'>Il a fréquenté les Rétro-lieux :</span></h3>"+
											"<ul data-role='controlgroup' data-mini='true'>"+
											"</ul>"+
										"</div><!-- /Lieu fréquenté -->"+

										"</div><!-- /content -->");
									
										var prenom = item.prenom; 
										var nom = item.nom; 
										var description = item.description; 
										var datenaiss = item.date_naiss;
										var datemort = item.date_mort;
										var origine = item.origine;
										var description = item.description;
										var descriptionbis = item.descriptionbis;
										var photoperso = item.photo_perso;
										var typeperso = item.type;
										var iconetypeperso = item.icone_type_personnage;
										var aimeun = item.aime_un;
										var aimedeux = item.aime_deux;
										var aimetrois = item.aime_trois;
										var nom_oeuvre_un = item.nom_oeuvre_un;
										var nom_oeuvre_deux = item.nom_oeuvre_deux;
										var lien_oeuvre_un = item.lien_oeuvre_un;
										var lien_oeuvre_deux = item.lien_oeuvre_deux;
										var lieufreq = item.nom_lieu;
										
										//ici on va construire la page personnage.html en fonction du personnage que l'utilisateur aura choisi
											//newWin.onload permet d'attendre que newwin (page lieux.html) soit bien chargée --> programmation évènmentielle
											
										//pb de crossdomain : toujours mettre http://www. !!!
									//	var newWin = window.open('http://www.argosapps.fr/retro_nath_com_alert/personnage.html', "_blank");
									//	newWin.onload = function() {
										
											//nom + prenom
										$('#nom_pero').html(prenom+" " +nom);
											
											//dates
											$('.dates').html(datenaiss+" - " +datemort);
											
											//origine
											$('#origine').html(origine);
											
											
											//type et icone type personnage
										$('#type-perso-zone').html("<img src='"+iconetypeperso+"' alt='' /><p id='type-perso'>"+typeperso+"</p>");
											
											//aime/centres d'intérêt
										$('#perso-aime ul').html('<li>'+aimeun+'</li><li>'+aimedeux+'</li><li>'+aimetrois+'</li>');
											
											//aime/centres d'intérêt
											$('#detail-oeuvres').html("<li><a href='"+lien_oeuvre_un+"'>"+nom_oeuvre_un+"</a></li><li><a href='"+lien_oeuvre_deux+"'>"+nom_oeuvre_deux+"</a></li>");
											
											//lieu fréq
											$('#lieu_frequente ul').html("<li><a href='#' data-role='button' data-icon='bouton_r' data-iconpos='right'>"+lieufreq+"</a></li>");
										
											//description sa vie
										$('#savie-txt').html(description);
											
											//description perso & Paris
										$('#perso-paris-txt').html(descriptionbis);
									//	};
										
										
										
										//alert("Personnage : " + prenom+" " +nom+" ,Description : " + description);
										
									});
										//window.location.href = 'http://argosapps.fr/retro_nath_com_alert/lieux.html';
									

								},
								error: function(){
									//do your thing
									console.log('so sad!');
								}
								});
								
								
								return false;
									
							
						});
									
		
							
                        },
                        error: function(){
                                //do your thing
                                console.log('Erreur dans la recherche du personnage...');
								

                        }
                });

                return false;
			}
        });