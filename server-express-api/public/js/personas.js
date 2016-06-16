$(function(){
  
  $('.botones .parteAgregar').append('<button id="agregar">Agregar</button>');
  $('.botones .parteAgregar').append('<input type="text" id="nombre" placeholder="Ingrese Nombre"></input>');
  $('.botones .parteAgregar').append('<input type="text" id="edad" placeholder="Ingrese Edad"></input>');
  $('.botones .parteAgregar').append('<input type="text" id="email" placeholder="Ingrese Email"></input>');
  $('#agregar').on('click', agregarUsuario);
  

  $('.botones .parteAgregar').append('<button id="refresh">Refresh Todo</button>');
  $('#refresh').on('click', listarUsuarios);

  $('.botones .parteMostrar').append('<button id="mostrar">Mostrar1</button>');
  $('.botones .parteMostrar').append('<input type="text" id="usuarioAMostrar" placeholder="Id a mostrar"></input>');
  $('#mostrar').on('click', listar1Usuario);

  $('.botones .parteEliminar').append('<button id="eliminar">Borrar</button>');
  $('.botones .parteEliminar').append('<input type="text" id="usuarioAEliminar" placeholder="Id a eliminar"></input>');
  $('#eliminar').on('click', eliminarUsuario);
  
  
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
  } // listarUsuarios  
  
  function listar1Usuario(){
    if( !$('#usuarioAMosrtar').val() ){
        console.log('Ingrese Id');
        return false;
    }
      
    $.get({
      url: '/personas/?='+ $('#usuarioAMostrar').val(),

      success: function(data){ //parte callback
        $('.container').html(getPersonaHtml(data)); 
        console.log('Respuesta del server:', data);
      } // success
    }); // get
  } // listar1Usuario

  function getPersonaHtml(data){ // para evitar hacer muchos appends
    var cadenaHtml='';

    cadenaHtml += '<div class="row"> <span class="col-xs-3"> ID: '+ data.id 
                   + '</span > <span class="col-xs-3"> Nombre: '+ data.nombre 
                   + '</span > <span class="col-xs-3"> Edad: '+ data.edad 
                   + '</span > <span class="col-xs-3"> Email: '+ data.email
                   + '</span></div>';

    return cadenaHtml;
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

  listarUsuarios();

}); // function