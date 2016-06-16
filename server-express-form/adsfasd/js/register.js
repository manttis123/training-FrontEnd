var registrar = (function(){
  var CREATE_URL = 'http://connectedin.herokuapp.com/person';

  function addUser(user){
    $.post({
        url: CREATE_URL,
        data: JSON.stringify(user),
        contentType: 'application/json'
      }),
      
      limpiarInputs();    
  } 

  function limpiarInputs(){
    $('input').val('');
  }

  return{
    addUser : addUser
  }
})();

  
  
