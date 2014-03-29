
		function loadListePersosType() {
		var ListePersosType = $('#liste_persotype ul');
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro_php_server/liste-persosType.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					
					//la valeur de l'id du lien (a) correspond à l'id du type dans la table 
					//on affiche la liste des types et les sous listes de personnages (pour chaque type) qui seront masquées au départ
					ListePersosType.append('<li><a id="'+item.id+'" href="#" rel="external"><img src="'+item.icone_type_personnage+'" alt=""/>'+item.type+'</a><ul  class="type-perso-item" data-role="listview" data-icon="false"></ul></li>');	
					$('#ul_liste_persotype').listview('refresh');
				
				});
				
				//au clic sur un des types de personnages, on va récupérer les personnages qui correspondent à ce type
				 $('#ul_liste_persotype li a').click(function(e) {
				 
				 //on cache tous les sous-listes (personnages d'un type)
				 $('#ul_liste_persotype li ul').hide();
				 
						
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idcatperso
							var idcatperso = $(this).attr('id');
							
							//on sélectionne le ul en prenant le parent (li) du lien surlequel on a cliqué (this), puis en prennant le fils "ul" de celui-ci (fils du li)
							 var ulduntype = $(this).parent("li").children("ul");
							ulduntype.html("Les Rétro personnages :");
						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/persos-selon-type.php?callback=?',
								data: ({'idcatperso' : idcatperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idcatperso']
								success: function(data){
								
									console.log('Succès !');
									
									$.each(data, function(i, item) {				
										
										var prenom  = item.prenom;
										var nom  = item.nom;
										var typeperso  = item.type;
										var idpersoduntype = item.idpersonnage;
										var iconepersodutype = item.icone_perso;

											
										ulduntype.show();
										//on va ajouter les sous listes à puces (personnages d'un type)
										
										//dans le ul en question, on affiche les personnages sous forme de sous-menu
										ulduntype.append('<li><a id="'+idpersoduntype+'" href="#" rel="external"><img src="'+iconepersodutype+'" alt=""/>'+item.nom+' '+item.prenom+'</a></li><div id="fiche-perso-dutype-'+idpersoduntype+'"></div>');
										//$('.type-perso-item').listview('refresh');
										
									});
										
										//au clic sur un des personnages d'un type, on va récupérer les infos de ce lieu pour afficher sous forme de fiche
										$('#ul_liste_persotype li ul li a').click(function(e) {
												//on va masquer tous les div au départ(contenant les fiches persos)
											$('#ul_liste_persotype li ul li div').hide();
												//alert("la fiche arrive bientot !!");
												var idperso = $(this).attr('id');
												//alert(idperso);
															
												//on va récupérer les infos de ce lieu ==> appel ajax ?
												// ************************************************************************************** //
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
																		var $divperso = '#fiche-perso-dutype-' + idperso;
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
																
															});
															

														},
														error: function(){
															//do your thing
															console.log('so sad!');
														}
													});
														
														
														return false;
								
								// ******************************************************************************************* //
														
											
											
											
											//e.preventdefault();
										});
															
															
									
																		
									

								},
								error: function(){
									//do your thing
									console.log('so sad!');
								}
								});
								
								
								return false;
								
							
						});
				
				
				
				
				

					//on va appeler l'url du fichier php (en get) en fonction de la variable idcatperso --> selon la requête
				
				
				},
			error: function(data) {
				ListePersosAZ.append('<li>There was an error loading the list');
				alert('Buuuug');  
			}
			
			
		});
	}
	loadListePersosType(); //à mettre obligatoirement
	
	
	
	