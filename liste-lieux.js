		//Pour afficher DYNAMIQUEMENT la liste des lieux de A à Z, tous les types de lieux et pour afficher les lieux dont on aura choisi le type
	
	//Lieux de A à Z
	function loadListeLieuxAZ() {
		var ListeLieuxAZ = $('#liste_lieuxAZ ul');
		var lieudata = $('#liste_lieuxAZ #lieu-dun-type');
		var infodulieu = $('#info_lieu ul');

		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro_php_server/liste-lieuxAZ.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					
					//la valeur de l'id du lien (a) correspond à l'id du type dans la table 
					ListeLieuxAZ.append('<li><a id="'+item.id+'" href="lieux.html" rel="external"><img src="'+item.icone_lieu+'" alt=""/>'+item.nom_lieu+'</a></li>');	
					$('#ul_liste_lieuxAZ').listview('refresh');					
				});
				
				
				//au clic sur un des types de lieux, on va récupérer les lieux qui correspondent à ce type
				 $('#ul_liste_lieuxAZ li a').click(function(e) {

							// event.preventDefault();
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idcatlieu
							var idlieu = $(this).attr('id');

						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/fiche-lieu-selon-lieu-liste.php?callback=?',
								data: ({'idlieu' : idlieu}), //on passe la variable en data pour la récupérer en PHP par $_GET['idcatlieu']
								success: function(data){
								
									console.log('Succès fiche lieu !');
									console.log(data); //on récupère bien les infos sur les lieux du type choisi 
									$.each(data, function(i, item) {

										//alert(item.adresse);
										var idlieu = item.id; 
										var nom_lieu = item.nom_lieu; 
										var banniere = item.banniere_lieu;
										var annee_construction = item.annee_construction;
										var adresse = item.adresse; 
										var site_web = item.site_web; 
										var telephone = item.telephone; 
										
										var metro = item.metro;
										var description = item.description; 
										
										
										//newWin.onload permet d'attendre que newwin (page lieux.html) soit bien chargée --> programmation évènmentielle
										//pb de crossdomain : toujours mettre http://www. !!!
										var newWin = window.open('http://www.argosapps.fr/retro_nath_com_alert/lieux.html', '_blank');
										newWin.onload = function() {
										
											// Afficher le nom du lieu
											jQuery('.nom_lieu', newWin.document).html(nom_lieu);
											
											// Afficher la banniere du lieu
											jQuery('#banniere_lieu', newWin.document).html("<img src='" +banniere+ "' alt='' />");
											
											// Afficher l'année de construction du lieu
											jQuery('.annee_construction', newWin.document).html(annee_construction);
											
											// Afficher l'adresse du lieu
											jQuery('.adresse', newWin.document).html(adresse);
										
											// Afficher le site web du lieu
											jQuery('.site_web', newWin.document).html(site_web);
										
										
											// Afficher le numéro de téléphone du lieu
											jQuery('.telephone', newWin.document).html(telephone);
											
											// Afficher le métro
											jQuery('.metro', newWin.document).html(metro);
										
											jQuery('#descrip_lieu', newWin.document).html(description);
											jQuery('#hidden-id-lieu', newWin.document).html("<input type='hidden' name='id_lieu_com' value='"+idlieu+"' />");
										};
										
										//alert("Lieu : " + nom_lieu + ", Adresse : " + adresse + ", Description : " + description   );

									});
									
											
									
									
									
									
									
									
									
									//maintenant, (à partir de data) il faut extraire les infos utiles : Nom lieux + petite photo des lieux
									
										//rediriger l'utilisateur vers la  fiche lieu (lieu choisi au clic)
										//setTimeout(function () { window.location.href= 'http://argosapps.fr/retro_nath_com_alert/lieux.html';},2000); // 5 seconds
										
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
			error: function(data) {
				ListeLieuxAZ.append('<li>There was an error loading the list');
				alert('Buuuug');
			}
			
			
		});
	}
	
	loadListeLieuxAZ(); //à mettre obligatoirement
	
		
	//Lieux par type : tous les types de lieux
	function loadListeLieuxType() {
		var ListeLieuxType = $('#liste_lieuxtype ul');
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro_php_server/liste-lieuxType.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					
					//la valeur de l'id du lien (a) correspond à l'id du type dans la table 				
					ListeLieuxType.append('<li><a id="'+item.id+'" href="liste_lieux_par_type.html" rel="external"><img src="'+item.icone_type_lieu+'" alt=""/>'+item.type_lieu+'</a></li>');	
					$('#ul_liste_lieuxtype').listview('refresh');	
				});
								
				//au clic sur un des types de lieux, on va récupérer les lieux qui correspondent à ce type
				 $('#ul_liste_lieuxtype li a').click(function(e) {
				 
						var lieuxaptype = $('#lieux_ap_type ul');
						var navtop = $('#onglet ul li a');
						var zonetest = $('#ul_liste_lieux_par_type');
						


							// event.preventDefault();
							//on récupère la valeur de l'id du lien sur lequel l'utilisateur a cliqué, et on la stocke dans la variable idcatlieu
							var idcatlieu = $(this).attr('id');

						$.ajax({
								type: "GET",
								dataType: 'jsonp',
								url: 'http://www.argosapps.fr/retro_php_server/lieux-selon-type.php?callback=?',
								data: ({'idcatlieu' : idcatlieu}), //on passe la variable en data pour la récupérer en PHP par $_GET['idcatlieu']
								success: function(data){
								
									console.log('Succès !');
									
									$.each(data, function(i, item) {
																		
										var nomlieu  = item.nom_lieu;
										var typelieu  = item.type_lieu;
										var iconelieu = item.icone_lieu;
										
									
										//lieuxaptype.append("<li>"+nomlieu+"</li>");
										
										
										alert("Lieu : " + nomlieu + ", Type de lieu : "+ typelieu);
										
										//newWin.onload permet d'attendre que newwin (page liste_lieux_par_type.html) soit bien chargée --> programmation évènmentielle
										//pb de crossdomain : toujours mettre http://www. !!!
										//_self permet de changer de page au lieu d'ouvrir une pop up avec _blank, ainsi l'utilisation du bouton retour sera toujours possible)
										var newWin = window.open('http://www.argosapps.fr/retro_julie/retro_nath_com_alert/liste_lieu_par_type.html', '_self');
										newWin.onload = function() {
										
											// Afficher le type de lieu
											jQuery('#page_title h1', newWin.document).html(typelieu);
											
											// Afficher l'icone du lieu
											jQuery('.contenu_liste ul', newWin.document).html('<li><img src="'+iconelieu+'" alt=""/><a href="lieux.html">'+nomlieu+'</a></li>');
											//$('#ul_liste_lieux_par_type').listview('refresh');	
										};
						
									});
									
									alert("test1");
									alert(jQuery.data(document.body, "variables" ).first);
									
																																						zonetest.append(jQuery.data(document.body, "variables" ).first);

									
										window.location.href = 'http://argosapps.fr/retro_nath_com_alert/liste_lieux_par_type.html';
									
									//navtop.hide();
										//ListeLieuxType.hide();
										//ListeLieuxAZ.hide();

									//on récupère bien les infos sur les lieux du type choisi 
									
									//maintenant, (à partir de data) il faut extraire les infos utiles : Nom lieux + petite photo des lieux
									
										//rediriger l'utilisateur vers la liste des lieux d'un type
										//etTimeout(function () { window.location.href= 'http://argosapps.fr/retro_nath_com_alert/liste_lieux_par_type.html'; // the redirect goes here
										//},2000); // 5 seconds
									

								},
								error: function(){
									//do your thing
									console.log('so sad!');
								}
								});
								
								
								return false;
								
							
						});
						
				
				},
			error: function(data) {
				ListeLieuxType.append('<li>There was an error loading the list');
				alert('Buuuug');
			}
			
			
		});
	}
	
	loadListeLieuxType(); //à mettre obligatoirement
	

	