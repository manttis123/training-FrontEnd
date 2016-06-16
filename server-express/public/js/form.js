$(function(){
	var form = $('form'),
		username = form.find('input.username'),
		password = form.find('input.password');
		
		form
			.find('input[type=submit]')
			.on('click', onClick);
		
		function onClick(){
			var errors = [];

			if(!username.val().length){
				errors.push('Ingresate un nombre papá');
			}
			if(!username.val().length){
				errors.push('Ingresate un password');
			}

			if(errors.length){
				for (var i = 0; i < errors.legnth; i++) {
					alerts(errors[i]);
				}

				return false;
			}

			$.post({
				url:'/login',
				data:{
					username:username.val(),
					password:password.val()
				},

				success: function(data){
					if(data.ok){
						console.log('todo ok');
					}
					else{
						console.log('password invalido');
					}
				} 
			});
			return false;
		}
});