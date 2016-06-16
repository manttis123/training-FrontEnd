var service = (function(){

  $('#divtabla').on('click', '.editdata', editar);
  $('#divtabla').on('click', '.viewdata', ver);

  function ver(){
    $('#divtabla').addClass('ocultar');
    var verusuario = {};
    verusuario.id = $(this).data('id');
    verusuario.summary = $(this).data('summary');
    verusuario.photo = $(this).data('photo');

    var aboutmecompleto = template_html.reemplazarEnHTML( template_html.aboutMe(), verusuario);
    //$('head').append(template_html.linkVerUsuario());
    $('#verusuario').append(aboutmecompleto);
  }

  function editar(){

    var usuario = {};
    usuario.id = $(this).data('id');
    usuario.firstName = $(this).data('firstname');
    usuario.lastName = $(this).data('lastname');
    usuario.gender = $(this).data('gender');
    usuario.address = $(this).data('address');
    usuario.birthday = $(this).data('birthday');
    usuario.email = $(this).data('email');
    usuario.summary = $(this).data('summary');
    usuario.photo = $(this).data('photo');
    console.log(usuario);

    $.ajax({
        url:'/usuario/',
        method:'put',
        data:{
            id: usuario.id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            gender: usuario.gender,
            birthday: usuario.birthday,
            email: usuario.email,
            summary: usuario.summary,
            address: usuario.address,
            photo: usuario.photo
            
        },
        success: function(data){
          console.log('respuesta del server', data);
        }
        });
    }

  function listarUsuarios(){
        $.ajax({
            url: 'https://connectedin.herokuapp.com/person',
            method: 'GET',
            contentType:'application/json',

            success: function(data){
                var tam = data.length;
                $('.tabla').remove();
                var tablaini = template_html.crearTablaYFilaCero();

                for(var i = 0 ; i < tam ; i++){
                    tablaini += template_html.reemplazarEnHTML(template_html.filaDatos(), data[i]);
                }

                tablaini += tablafin;
                $('#divtabla').append(tablaini);
            }
        });
    }
    return{
      listarUsuarios: listarUsuarios
    }
}());

var template_html = (function(){

    var templateContainer = $('#templates'),
        filacero,
        filadatos,
        aboutme,
        linkverusuario;

        templateContainer.find('#todoTemplate').load('/templates/filacero.html', function(){
        filacero = templateContainer.find('#todoTemplate').html();
        });

        templateContainer.find('#todoTemplate').load('/templates/filadatos.html', function(){
        filadatos = templateContainer.find('#todoTemplate').html();
        });

        templateContainer.find('#templateVerUsuario').load('/templates/aboutme.html', function(){
        aboutme = templateContainer.find('#templateVerUsuario').val();
        });

        templateContainer.find('#templateVerUsuario').load('/templates/linkverusuario.html', function(){
        linkverusuario = templateContainer.find('#linkVerUsuario').html();
        });

        tablafin = '</table>';

        function filaDatos(){
          return filadatos;
        }
        function aboutMe(){
          return aboutme;
        }
        function linkVerUsuario(){
          return linkverusuario;
        }

        function crearTablaYFilaCero(){
          var tablaini = '<table id="tabla" class="pure-table tabla margen-arriba">';
          return tablaini += filacero;
        }
        function reemplazarEnHTML(cadenaHTML, persona){
          return cadenaHTML
                          .replace(/%id%/g, persona._id)
                          .replace(/%firstname%/g, persona.firstName)
                          .replace(/%lastname%/g, persona.lastName)
                          .replace(/%gender%/g, persona.gender)
                          .replace(/%address%/g, persona.address)
                          .replace(/%birthday%/g, persona.birthday)
                          .replace(/%email%/g, persona.email)
                          .replace(/%summary%/g, persona.summary)
                          .replace(/%photo%/g, persona.photo);
        }

        return{
          crearTablaYFilaCero: crearTablaYFilaCero,
          reemplazarEnHTML: reemplazarEnHTML,
          filaDatos: filaDatos,
          aboutMe: aboutMe,
          linkVerUsuario: linkVerUsuario
        }
}());

$(function(){

  service.listarUsuarios();
})
