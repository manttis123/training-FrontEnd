var editarXid = false;
var registrar = (function(){

	var $form;

	init();

    function init(){
        $form = $('form');
        setupListeners();
        levantarID($form);
		console.log(editarXid);
    }

    function setupListeners(){
        $form.on('submit', onFormSubmit);
    }

    function onFormSubmit(e){
    	e.preventDefault();

        var data = serializar.getData($form);
		if(editarXid)
        {
            service.editarUsuario(editarXid, data);
            console.log('editarUsuario');
        }
        else
        {
            service.crearUsuario(data);
            console.log('crearUsuario');
        }
        console.log(data);
    }
    function levantarID($form){
        $.get({

        url:'/usuario/',
        data:{
        },
            success: function(data){
                console.log('respuesta del server', data);
                
				editarXid = data.id;
                $form.find('#nom').val(data.firstName);
              	$form.find('#ape').val(data.lastName);

                if(data.gender === 'M') 
                    $form.find('#sexM').prop('checked', true);
                else
                    $form.find('#sexF').prop('checked', true);

                var fecha = new Date(data.birthday);
                $form.find('#fenac').val(fecha.getFullYear()+'-'+fecha.getMonth()+'-'+fecha.getDate());
                console.log(data.birthday);
                console.log(fecha.getFullYear(),fecha.getMonth(), fecha.getDate());

                $form.find('#email').val(data.email);
                $form.find('#resumen').val(data.summary);
				$form.find('#dir').val('dire', data.address);
				$form.find('#foto').val(data.photo);
            }
        });
    }

}());

var serializar = (function(){

	function getData($form){
        var serializeData = $form.serializeArray();
        var registro = {};

        serializeData.forEach(function (keyValue){
            registro[keyValue.name] = keyValue.value;
        });

        return registro;
	}

	return{
		getData: getData
	}
}());

var service = (function(){

    function crearUsuario(user){
        $.ajax({
            url: 'https://connectedin.herokuapp.com/person',
            method: 'POST',
            data: JSON.stringify(user),
            contentType:'application/json'
        });
    }
		function editarUsuario(id, user){
		console.log(editarXid);
	    $.ajax({
	    url: 'https://connectedin.herokuapp.com/person/' + id,
	    method: 'PUT',
	    data: JSON.stringify(user),
	    contentType:'application/json'
	    })
		}

    return{
        crearUsuario: crearUsuario,
				editarUsuario: editarUsuario
    }
}());
