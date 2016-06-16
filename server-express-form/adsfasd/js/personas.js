var listar = (function(){
  var PERSONS_URL = 'http://connectedin.herokuapp.com/person';

  templateContainer = $('#templates'),
  taskTemplate = '';
  templateContainer.find('#todoTemplate').load('./task-template.html', function(tmpl) {
    taskTemplate = tmpl;
  });

  function listUsers(){  
    $.get({
      url: PERSONS_URL, 
      
      success: function(data){
        var cadenaHtml='';
        for(var i =0 ; i< data.length;i++){
          cadenaHtml += getPersonaHtml(data[i]);
        }
        $('.container table tbody').html(cadenaHtml);
      }, // success
      error: function (data){
        console.log('Respuesta del server:', data.responseText);
      },
    }); // get
  } // listUsers

  function getPersonaHtml(data){ // para evitar hacer muchos appends
      return taskTemplate
        .replace(/%id%/g, data._id)
        .replace(/%nombre%/g, data.firstName)
        .replace(/%apellidos%/g, data.lastName)
        .replace(/%password%/g, data.password)
        .replace(/%email%/g, data.email)
        .replace(/%fechanac%/g, data.birthday)
        .replace(/%genero%/g, data.gender)
        .replace(/%direccion%/g, data.address);
  }   

  return{
    listUsers: listUsers
  }
}()); 

var editar = (function (){

  var EDIT_PERSON_URL = 'http://connectedin.herokuapp.com/person/';

  function editUser(){
    var persona = {firstName : "lalalala"}
    $.ajax({
      url: EDIT_PERSON_URL+ $(this).data('id'),
      method: 'PUT',
      data: JSON.stringify(persona),
      contentType:'application/json'
    })
  }

  return{
    editUser: editUser
  }
})();


(function(){
  /*$('.container').on('click','.edit', editar.editUser);*/
    function init(){
    listar.listUsers();

    $('.container table').on('click','.edit', editar.editUser);
  }

  init();

}());