		//Pour afficher TOUTES les infos du lieux DYNAMIQUEMENT
	function loadListePersosAZ() {
		var ListePersosAZ = $('#liste_persoAZ ul');
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro_php_server/liste-persosAZ.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					
					//la valeur de l'id du lien (a) correspond à l'id du type dans la table 
					ListePersosAZ.append('<li><a id="'+item.id+'" href="#" rel="external"><img src="'+item.icone_perso+'" alt=""/>'+item.nom+' '+item.prenom+'<img src="http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png" alt="icone flèche" class="arrow_icon"/></a></li><div id="fiche-perso-'+item.id+'"></div>');
					$('#ul_liste_persoAZ').listview('refresh');						
				});
				
				//********* test *********//
			
														
				//************ fin test ***********//	
				
				//au clic sur un des types de lieux, on va récupérer les lieux qui correspondent à ce type
				 $('#ul_liste_persoAZ li a').click(function(e) {
					
					if ( $(this).hasClass("opened") == true) {
						$('#ul_liste_persoAZ div').hide();
						$('#ul_liste_persoAZ li a').removeClass("opened");
						current_id = $(this).attr("id")
						$(current_id + "img").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_down.png");
					} else {
					$(this).addClass("opened");
						current_id = $(this).attr("id")
						$(current_id + "img").attr("src","http://argosapps.fr/retro-appli-accordeon-fiches/img/arrow_up.png");
					 
					//on va masquer tous les div au départ(contenant les fiches persos)
					$('#ul_liste_persoAZ div').hide();
				
							// event.preventDefault();
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idperso
							var idperso = $(this).attr('id');

						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/fiche-perso-selon-perso-liste.php?callback=?',
								data: ({'idperso' : idperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idperso']
								success: function(data){
								
										//On prépare
													$divperso = '#fiche-perso-' + idperso;
													//alert($divperso);
													
													//on affiche la fiche du personnage correspondant à celui cliqué
													$($divperso).show();
													//$($divperso).addClass("active");
													
													//********* test *********//
													
													//if($($divperso).is("visible")) {
													//	$($divperso).hide();
													//}
														
													//if($($divperso).hasClass("active")) {
													//	$($divperso).slideToggle('normal');
													//	$($divperso).removeClass("active");
													//} else {
													//	$($divperso).slideUp('normal');
												//	}
													
													
													
													// On ferme par effet de slide tous les div
													//$('#ul_liste_persoAZ div').slideUp('normal');
													
													//if($("#ul_liste_persoAZ div").hasClass("active")) {
														// On ouvre celui qui suit directement le lien sur lequel on a cliqué
														//$($divperso).slideToggle('normal');
														//on suprrime ensuite la class active
														//$("#ul_liste_persoAZ div").removeClass('active');
													//}
													
													//$("#ul_liste_persoAZ div").removeClass('active');
													
 
														
														
													//************ fin test ***********//	
													
													//on construit la fiche qui va contenir du code html :
													$($divperso).html("<div data-role='content'>"+
														"<div id='page_title'>"+
														"<a href='index.html' data-role='button' data-icon='bouton_l' data-iconpos='notext' data-rel='back'>Retour</a>"+
															"<h1 class='nom_perso'></h1><!--A CHANGER SELON LE NOM-->"+
														"</div><!-- /page_title -->"+

													"<!--photo + date-->"+	
														"<div id='info'>"+
															"<img src='img/img-albert-camus.png' alt='' />"+
															"<div class='type-perso-zone'>"+
																"<!-- type ici du perso et icone -->"+
															"</div>"+
															"<p class='small-font dates'></p><!--A CHANGER SELON LE NOM-->"+
															"<p class='origine' class='small-font'></p>"+
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
														"<p class='savie-txt'></p>"+
														"<h4 class='perso-paris'>Lui et Paris !</h4>"+
														"<p class='perso-paris-txt'></p>"+
														"</div><!-- /bio-->"+
														"</div>"+
														
													"<br />"+
													"<!--Oeuvres-->"+
														"<div id='oeuvres' class='rose'><h3><span class='bold'>Ses oeuvres</span></h3>"+
															"<img src='img/icone-cadis.png' class='icone' alt='' />"+
															"<ul><!--LI A CHANGER SELON BDD-->"+
															"<li id='amazon'><h4>Acheter sur Amazon</h4> <img src='img/perso/amazon.png' alt='' /></li>"+
																"<ul class='detail-oeuvres'>"+
																"<!--<li><a href='#'>L'Étranger (1942)</a></li>	"+
																"<li><a href='#'>La Peste (1947)</a></li>-->	"+
																"</ul>"+
															"</ul>"+
														"</div> <!-- /Oeuvres -->"+

													"<br/>"+

													"<!--Lieu fréquenté-->"+
														"<div class='lieu_frequente' class='rose alinea'>"+
														"<p class='affichelieuxfreq'></p>"+
														"<h3><span class='bold'>Il a fréquenté les Rétro-lieux :</span></h3>"+
															"<ul data-role='controlgroup' data-mini='true'>"+
															"</ul>"+
														"</div><!-- /Lieu fréquenté -->"+

														"</div><!-- /content -->");
									
									console.log('Succès fiche perso !');
									console.log(data); //on récupère bien les infos sur le personnage choisi
						//***********on affiche les infos du type de personnage : ****************
									$.ajax({
											type: "GET",
											dataType: 'jsonp',
											url: 'http://www.argosapps.fr/retro_php_server/typeperso-selon-fiche.php?callback=?',
											data: ({'idperso' : idperso}), //on passe la variable en data pour la récupérer en PHP par $_GET['idperso']
											success: function(data){
												console.log('succes type perso!');
												$.each(data, function(i, item) {
													var typedupersonnage = item.type;
													var iconetypeperso = item.icone_type_personnage;
													$('.type-perso-zone').append("<img src='"+iconetypeperso+"' alt='' /><p class='type-perso'>"+typedupersonnage+"</p>");
												});
														
														
											},
											error: function(){
												console.log('so sad!');
											}
									});
									
									//*************on affiche les infos sur le personnage***********//
										$.each(data, function(i, item) {
														
													
														var prenom = item.prenom; 
														var nom = item.nom; 
														var description = item.description; 
														var datenaiss = item.date_naiss;
														var datemort = item.date_mort;
														var origine = item.origine;
														var description = item.description;
														var descriptionbis = item.descriptionbis;
														var photoperso = item.photo_perso;
													//	var typedupersonnage = item.type;
														//var iconetypeperso = item.icone_type_personnage;
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
														
														//alert(typedupersonnage);
											
															//nom + prenom
														$('.nom_perso').html(prenom+" " +nom);
															
															//dates
															$('.dates').html(datenaiss+" - " +datemort);
															
															//origine
															$('.origine').html(origine);
															
															// *********** test ********************** //
															//type et icone type personnage
															
														
															
															//*************** fin test *******************//
														
													
															//aime/centres d'intérêt
														$('#perso-aime ul').html('<li>'+aimeun+'</li><li>'+aimedeux+'</li><li>'+aimetrois+'</li>');
															
															//aime/centres d'intérêt
															$('.detail-oeuvres').html("<li><a href='"+lien_oeuvre_un+"'>"+nom_oeuvre_un+"</a></li><li><a href='"+lien_oeuvre_deux+"'>"+nom_oeuvre_deux+"</a></li>");
															
															
															
														
															//description sa vie
														$('.savie-txt').html(description);
															
															//description perso & Paris
														$('.perso-paris-txt').html(descriptionbis);
													//	};
													
													//lieu fréq
														//alert(item.nom_lieu);
														$('.lieu_frequente ul').append('<li>'+lieufreq+'</li>');
														
														//$('.affichelieuxfreq').append(lieufreq);
														
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
						
						
						
						
						
							} //fin du else
						});
				
				
				
				},
			error: function(data) {
				ListePersosAZ.append('<li>There was an error loading the list');
				alert('Buuuug');  
			}
			
			
		});
	}
	loadListePersosAZ(); //à mettre obligatoirement
	
	
	
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
					ListePersosType.append('<li><a id="'+item.id+'" href="#" rel="external"><img src="'+item.icone_type_personnage+'" alt=""/>'+item.type+'</a></li>');	
					$('#ul_liste_persotype').listview('refresh');
				});
				
				
				//au clic sur un des types de personnages, on va récupérer les personnages qui correspondent à ce type
				 $('#ul_liste_persotype li a').click(function(e) {
						
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idcatperso
							var idcatperso = $(this).attr('id');

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
															
										
										alert("Personnage : " + prenom +" " +nom+ ", Type de personnage : "+ typeperso);
						
									});
									
									
										//window.location.href = 'http://argosapps.fr/retro_nath_com_alert/liste_lieux_par_type.html';
									
									

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
	
	
	
	