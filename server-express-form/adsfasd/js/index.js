(function (){
  var $formLogin;
  var $formRegister;

  
  function init(){
    $formLogin = $('.header form');
    $formRegister = $('.container form');
    setupListeners();
  }

  function setupListeners(){
    $formLogin.on('submit', onFormLoginSubmit);
    $formRegister.on('submit', onFormRegisterSubmit);
  }

  function onFormLoginSubmit(e){
      e.preventDefault();
      var user = serializar.data($formLogin);
  }

  function onFormRegisterSubmit(e){
    e.preventDefault();
    var user = serializar.data($formRegister);
    registrar.addUser(user);
  }

  init();

}());

var serializar = (function(){

  function getData($form){
    var serializarData = $form.serializeArray();
    var registro = {};

    serializarData.forEach (function (keyValue){
      registro[keyValue.name] = keyValue.value;
    })

    return registro;
  }

  return{
    data: getData
  }
  
}());

