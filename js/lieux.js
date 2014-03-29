		//Pour afficher TOUTES les infos du lieux DYNAMIQUEMENT
	function loadDetailsLieux() {
		var nomLieu = $('#page_title');
		var infoLieu = $('#info_lieu ul:first');
		var infoLieuRight = $('#info_lieu ul:last-child');
		var descriptionLieu = $('#descrip_lieu');
		var banniereLieu = $('#banniere_lieu');
		
		$.ajax({
			type: 'GET',
			url: 'http://www.argosapps.fr/retro_php_server/lieu.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 8000,
			success: function(data) {
				$.each(data, function(i,item){
					//la valeur de l'id du lien (a) correspond à l'id du type dans la table
					banniereLieu.append('<img src="'+item.banniere_lieu+'" alt=""/>');	
					infoLieu.append('<li class="left">'+item.adresse+'</li>');
					infoLieu.append('<li class="left">'+item.code_postal+'</li>');
					infoLieu.append('<li class="left">'+item.metro+'</li>');
					infoLieuRight.append('<li class="right">0'+item.telephone+'</li>');
					infoLieuRight.append('<li class="right"><a href="http://'+item.site_web+'" rel="external">'+item.site_web+'</a></li>');				
					infoLieuRight.append('<li class="right"><a href="img/plan_metro.png" rel="external">Voir le plan de métro</a></li>');				
					descriptionLieu.append(item.description);				
					nomLieu.append('<h1>'+item.nom_lieu+'</h1>');				
				});
					//on va appeler l'url du fichier php (en get) en fonction de la variable idcatperso --> selon la requête
				
				
				},
			error: function(data) {
				infoLieu.append('<li>There was an error loading the bugs');
				alert('Buuuug');
			}			
		});
	}
	
	loadDetailsLieux(); //à mettre obligatoirement
	
	
	$.mobile.changePage( "../lieux.html", { transition: "slideup"} );