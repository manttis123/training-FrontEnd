var form = (function(){
	var container = $('.container'),
    	templateForm = $('#divtabla');
   

  function loadTemplate(userData){

  	$.get('/templates/form.html', function (r){
      container.find(templateForm).html(r);
      
      if(userData){
        fillTheForm(userData);
      }
     //carga form
      createListeners(userData);
    })
  }

  function createListeners(userData){
	  container.find('#continue').off('click').on('click',service.addUser);
	  container.find('#back').off('click').on('click',backToMain);

    container.find('.continueEdit').off('click').on('click',function(e){     
      e.preventDefault;
      cargar();
    });

    function cargar(){
      service.putUser(userData._id, userData);
    }
  }

  function fillTheForm(userData){
    templateForm.find('h4').text('Edit User Information');

    container.find('#continue').addClass("continueEdit");
    container.find('#continue').removeAttr("id");


    container.find('#back').off('click').on('click',backToMain);


    templateForm.find('#nombre').val(userData.firstName);
    templateForm.find('#apellido').val(userData.lastName);

    if(userData.gender === 'M'){
      templateForm.find('#sexoM').prop('checked', true);
    }
    else{
      templateForm.find('#sexoF').prop('checked', true);
    }   

    var fechaObject = new Date(userData.birthday);
    var mes = fechaObject.getMonth() + 1;
    var dia = fechaObject.getUTCDate();
    if (mes < 10){
      mes = '0'+ mes;
    }
    if (dia < 10){
      dia = '0'+ dia;
    }
    var fechaString = fechaObject.getFullYear() + '-' + mes + '-' + dia;
    templateForm.find('#edad').val(fechaString);
      
    templateForm.find('#direcc').val(userData.address); 
    templateForm.find('#foto').val(userData.photo);
    templateForm.find('#email').val(userData.email);
  } 

	function backToMain(){ //Boton Back del Form, limpio el div
		$(templateForm).html('<div class="wrap row" id="divtabla"></div>');
	}
 
 	return{
 		loadTemplate: loadTemplate,
    fillTheForm: fillTheForm,
    backToMain: backToMain
 	}
})();


var list = (function(){
    var container = $('.container'),
    	templateForm = $('#divtabla');

	var filacero,
        filadatos;
        tablafin =	'</table>'+
        			'<row>'+
        				'<div class="col-md-2 col-md-offset-5">'+
        					'<button type="button" class="btn" id="back">Back</button>'+
        				'</div>'+
        			'</row>'+
        			'</div>';
        

	function init(){
		container.find(templateForm).load('/templates/filacero.html', function(){
	    filacero = container.find(templateForm).html();
	    });

		$.get('/templates/filadatos.html', function (r){
			container.find(templateForm).html(r);
	   		filadatos = container.find(templateForm).html();
		});

	   
	} 

    function filaDatos(){
        return filadatos;
    }
        
    function crearTablaYFilaCero(){
        var tablaini = '<div class="overflowTable"> <table id="tabla" class="pure-table tabla margen-arriba">';
        
        return tablaini += filacero;
    }
    
    function construirPersonaHTML(cadenaHTML, persona){
    	var fechaObject = new Date(persona.birthday);
    	var mes = fechaObject.getMonth() + 1;
    	var fechaString = fechaObject.getUTCDate() + " / " + 0+mes + " / " + fechaObject.getFullYear();
    	

    	var gender = persona.gender;

    	if(gender == 'F'){
    		gender = 'Female';
    	}
    	else{
    		gender = 'Male';
    	}

    	return cadenaHTML
                      .replace(/%id%/g, persona._id)
                      .replace(/%firstname%/g, persona.firstName)
                      .replace(/%lastname%/g, persona.lastName)
                      .replace(/%gender%/g, gender)
                      .replace(/%address%/g, persona.address)
                      .replace(/%birthday%/g, 0+fechaString)
                      .replace(/%email%/g, persona.email)
					            .replace(/%password%/g, persona.password)                     
                      .replace(/%summary%/g, persona.summary)
                      .replace(/%photo%/g, persona.photo);
    }

   return{
   		init: init,
   		crearTablaYFilaCero: crearTablaYFilaCero,
        construirPersonaHTML: construirPersonaHTML,
        filaDatos: filaDatos,
    }
   	
})();

education = (function(){

})();

var service = (function(){
	var container = $('.container'),
      templateForm = $('#divtabla');
	

	function addUser(e){ // Boton Continue del  Form (POST)
		e.preventDefault();
		
		var user = {
		firstName: templateForm.find('#nombre').val(), 
		lastName: templateForm.find('#apellido').val(),
		gender: templateForm.find('.sexo:checked').val(),
		birthday: templateForm.find('#edad').val(),
		address: templateForm.find('#direcc').val(),
		photo: templateForm.find('#foto').val(),
		email: templateForm.find('#email').val(),
		password: templateForm.find('#contra').val(),
		};
		console.log(user); // Mostrar usuario en consola
		if(templateForm.find('#contra').val()==templateForm.find('#contra2').val()){
			$.ajax({ 
				url:'http://connectedin.herokuapp.com/person',
				method: 'POST',
				data: JSON.stringify(user),
				contentType: 'application/json',
				success: function(data){
					$('#formulario').trigger("reset"); // Limpio formulario
					alert('User Added');
				},
				error: function(data){
					alert('Check the info');
				}
			});//POST	
		}
		else{
			alert('Mismatch Password');
		}
		return false;
	} // addUser


	function listUsers(){
        $.ajax({
            url: 'https://connectedin.herokuapp.com/person',
            method: 'GET',
            contentType:'application/json',

            success: function(data){
            	
                var tam = data.length;
                $('.tabla').remove();
                var tablaini = list.crearTablaYFilaCero();

                for(var i = 0 ; i < tam ; i++){
                    tablaini += list.construirPersonaHTML(list.filaDatos(), data[i]);
                }

                tablaini += tablafin;
                $(templateForm).html(tablaini);
            }
        });
         	
        container.find(templateForm).on('click', '.viewUserButton', function(){
        	user.showSelectedUser($(this).data('id'));
        }) // Mostrar usuario seleccionado

        container.find(templateForm).on('click', '.editUserButton', function(){
          editUser($(this).data('id'));
        }) // Editar usuario seleccionado*/

        container.find(templateForm).on('click', '#back', function(){
        	form.backToMain();
        }) // Quitar lista
	} // listUsers
  
  function editUser(userId, userData){
      form.loadTemplate(userData);
  } // editUser 

  function putUser (userId, userData){
    var user = {
    firstName: templateForm.find('#nombre').val(), 
    lastName: templateForm.find('#apellido').val(),
    gender: templateForm.find('.sexo:checked').val(),
    birthday: templateForm.find('#edad').val(),
    address: templateForm.find('#direcc').val(),
    photo: templateForm.find('#foto').val(),
    email: templateForm.find('#email').val(),
    password: templateForm.find('#contra').val(),
    };
    
    if(templateForm.find('#contra').val() != "" && templateForm.find('#contra').val()==templateForm.find('#contra2').val()){
      $.ajax({
        url: 'https://connectedin.herokuapp.com/person/' + userId,
        method: 'PUT',
        data: JSON.stringify(userData),
        contentType:'application/json',
        success: alert('User Edited')
      });//put 
    }
    else{
      alert('Mismatch Password');
    }

    
  }

    return{
    	addUser: addUser,
    	listUsers: listUsers,
      putUser : putUser,
      editUser: editUser
    }

})();

var admin = (function(){
	var adminButtons = $('.header');

	init();

	function init(){

		adminButtons.find('#createUserButton').off('click').on('click',pressCreate);
		adminButtons.find('#listUsersButton').off('click').on('click',pressListUsers);
	}

	function pressCreate (e){
		e.preventDefault();
		form.loadTemplate();
	}

	function pressListUsers (e){
		e.preventDefault();
		list.init();
		service.listUsers();
	}

})();


