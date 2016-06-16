var user = (function (){
	var adminButtons = $('.header'),
		container = $('.container'),
		colInfo = $('.col-info'),
		colIcons = $('.col-icons'),
		templateForm = $('#divtabla');

	init();

	function init(){
		var userId;
		
		userId = getId();
		getUser(userId); // cargar usuario
	}

	function getId (){ // Obtengo el id de login.html
		var paramstr = window.location.search.substr(1);
		var paramarr = paramstr.split ("&");
		var param;

		param = paramarr[1];
		return param;
	}

	function getUser(userId){
		$.ajax({
            url: 'https://connectedin.herokuapp.com/person/'+userId,
            method: 'GET',
            contentType:'application/json',
            success: function(userData){            	
				$.get("/templates/userData.html", function (columnaData){
            		loadUser(columnaData, userData);
            		});
				}
        });
    }
	
	function loadUser(columnaData, userData){
		var html;

		html = list.construirPersonaHTML(columnaData, userData); // reemplazo los token
            	colInfo.html(html); // Columna en string


		var userNam = '<p>Hello %name%</p>';
		var replaced = userNam.replace(/%name%/gi, userData.firstName);
		adminButtons.find('#name').html(replaced);	// Muesto el nombre	

		loadAboutMe(userData);							
	}

	function showSelectedUser(userId){
		getUser(userId);
	}

	function loadAboutMe(userData){
		$.get("/templates/aboutme.html", function (r){
			var aboutmecompleto = list.construirPersonaHTML(r, userData);
	   		container.find(templateForm).html(aboutmecompleto);
		});
		
		container.find(colInfo).off('click').on('click','#editButton', function(e){
						e.preventDefault();
						editUser(userData);
						}); // Hacer llamada a editar usuario

		/*Botones Iconos*/
		colIcons.find('#aboutMeButton').click(function(){
			loadAboutMe(userData);
		});

		colIcons.find('#educationButton').click(function(){
			loadEducation(userData);
		});

		colIcons.find('#locationButton').click(function(){
			loadLocation(userData);
		});
		//////////////////////

		/*Botones de About Me*/
		container.find(templateForm).on('click', '#confirmSummary', confirmSummary);
		
		container.find(templateForm).on('click', '#editSummary', editSummary);
		//////////////////////
	}

	function loadEducation(userData){
		$.get("/templates/education.html", function (r){
			var educationcompleto = list.construirPersonaHTML(r, userData);
	   		container.find(templateForm).html(educationcompleto);
	   	});
	}

	function loadLocation(userData){
		container.find(templateForm).html(	'<div class="col-sm-12">'+
											'<div id="map"></div>'+
											'<div class="col-sm-offset-4 col-sm-4"><button id="editcoordinate" class="form-control btn-default">Send Coordinates</button></div>'+
											'</div>');
		
		map = new google.maps.Map(document.getElementById('map'), {
    		center: {lat: -34.397, lng: 150.644},
    		zoom: 12
  		})
		initMap(userData);	
	}

	function editUser(userData){
		service.editUser(userData._id, userData);
	}	

	function confirmSummary (){
     	parrafos = $('#divtabla').find('p');
     	var textos= [];

     	$.each(parrafos, function(a,text){textos.push(text.innerHTML)});
     	templateForm.find('p').removeAttr("contentEditable");
	}

	function editSummary (){
		templateForm.find('p').attr("contentEditable", "true");
	}


	return{
		init: init,
		showSelectedUser: showSelectedUser,
		loadLocation:loadLocation,
		editUser: editUser
	}

})();


