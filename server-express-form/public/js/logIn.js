var add = (function(){
	var dataUser = $('.header'),
		inval = dataUser.find('#inval'),
		contr = dataUser.find('#passin'),
		usuar = dataUser.find('#usuar');
	
	init();

	function init (){
		dataUser.find('#logInButton').off('click').on('click',logIn); //Pongo en escucha los botones del admin
	}
	
	function logIn(e){
		e.preventdefault;
		var userId,
			usuario = dataUser.find('#user').val(),
			contrasena = dataUser.find('#pass').val();

		$.ajax({
			url:'http://connectedin.herokuapp.com/person',
			method: 'GET',
			success: function(data){
				if(usuario && contrasena){ //validacion del login
					var	i=0,
						b=0,
						c=0;

					while (b == 0 && c == 0 && i < data.length){
						if (usuario == data[i].email) {
							b=1;
							if(contrasena == data[i].password){
								c=1;
								userId = data[i]._id;
								console.log("Id en idex: "+userId);
								try{
									window.location="user.html?id=sestoy&"+userId+"&encriptando";
								}
								catch(err){
									console.log("imposible");
								}
							}
							else { //Usuario o Contraseña incorrectos
								i++;
								usuar.css("display","none");
								contr.css("display", "none");
								inval.css("display","block");
								b=0;
								c=0;
							}
						}
						else{ //Usuario o Contraseña incorrectos
							i++;
							usuar.css("display","none");
							contr.css("display", "none");
							inval.css("display","block");
							b=0;
							c=0;	
						}
					}
				}
				else{
					if(usuario){ // Si hay usuario, falta poner password
						contr.css("display", "block");
						usuar.css("display","none");
					}
					else{	//Si no hay usuario, falta poner usuario
						contr.css("display", "none");
						usuar.css("display","block");
					}
					inval.css("display","none");
				}
			}
		});
	}

})();