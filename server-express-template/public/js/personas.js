$(function(){
  
  $('.botones .parteAgregar').append('<button class="btn-success" id="agregar">Agregar Persona</button>');
  $('.botones .parteAgregar').append('<input type="text" id="nombre" placeholder="Ingrese Nombre"></input>');
  $('.botones .parteAgregar').append('<input type="text" id="edad" placeholder="Ingrese Edad"></input>');
  $('.botones .parteAgregar').append('<input type="text" id="email" placeholder="Ingrese Email"></input>');
  $('#agregar').on('click', agregarUsuario);

  $('.botones .parteEliminar').append('<button class="btn-danger" id="eliminar">Borrar Persona</button>');
  $('.botones .parteEliminar').append('<input type="text" id="usuarioAEliminar" placeholder="Id a eliminar"></input>');
  $('#eliminar').on('click', eliminarUsuario);

  $('.botones .parteMostrar').append('<button class="btn-info" id="mostrar">Mostrar 1 Persona</button>');
  $('.botones .parteMostrar').append('<input type="text" id="usuarioAMostrar" placeholder="Id a mostrar"></input>');
  $('#mostrar').on('click', listar1Usuario);

  $('.botones .parteMostrar').append('<button class="btn-info" id="refresh">Refresh</button>');
  $('#refresh').on('click', listarUsuarios);

  templateContainer = $('#templates'),
  taskTemplate = '';
  templateContainer.find('#todoTemplate').load('/task-template.html', function(){
    taskTemplate = templateContainer.find('#todoTemplate').val();
  });


  function limpiarInputs(){
    $('input[type="text"]').val('');
  }

  function listarUsuarios(){
    $.get({
      url: '/personas', 

      success: function(data){
        var cadenaHtml='';
        for(var i =0 ; i< data.length;i++){
          cadenaHtml += getPersonaHtml(data[i]);
        }
        $('.container').html(cadenaHtml);
      }, // success
      error: function (data){
        console.log('Respuesta del server:', data.responseText);
      },
    }); // get
    limpiarInputs();
  } // listarUsuarios  
  
  function listar1Usuario(){
    if( !$('#usuarioAMostrar').val() ){
        console.log('Ingrese Id');
        return false;
    }
      
    $.get({
      url: '/personas/'+ $('#usuarioAMostrar').val(),

      success: function(data){ //parte callback
        $('.container').html(getPersonaHtml(data)); 
        console.log('Respuesta del server:', data);
      } // success
    }); // get
    limpiarInputs();
  } // listar1Usuario

  function getPersonaHtml(data){ // para evitar hacer muchos appends
      return taskTemplate
        .replace(/%id%/g, data.id)
        .replace(/%nombre%/g, data.nombre)
        .replace(/%edad%/g, data.edad)
        .replace(/%email%/g, data.email);
  }

  function agregarUsuario(){
    $.post({
      url: '/personas',
      data:{
        nombre: $('#nombre').val(),
        edad: $('#edad').val(),
        email: $('#email').val()
      },

      success: function(data){ // cuando el servidor termina el pedido, devuelve data
        console.log('Respuesta del server:', data); // muestra en la consola de front (html)
      }  
    }); // post
    limpiarInputs();
  } // agregarUsuario

  function eliminarUsuario(){
    $.ajax({
      url: '/personas',
      method: 'delete',
      data:{
        id: $('#usuarioAEliminar').val(),
      },

      success: function(data){ // cuando el servidor termina el pedido, devuelve data
        console.log('respuesta del server', data); // muestra en la consola de front (html)
      },
      error: function (data){
        console.log('Respuesta del server:', data.responseText);
      }
    }); // delete
  } // eliminarUsuario

  /*Muestra Todos los usuarios al iniciar la página*/
  listarUsuarios();

}); // function