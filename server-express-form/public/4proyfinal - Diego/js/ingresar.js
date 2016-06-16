$(function(){

	var $form,
		inputemail,
		inputpassword;

		$form = $('form');

		inputemail = $form.find('input.email');
    	inputpassword = $form.find('input.pass');

        $form.on('submit', ingresar);

	function ingresar(e){
        e.preventDefault();

		if(!inputemail.val().length){
        	inputemail.parents('.form-group').addClass('has-error');	
        	inputemail.parents('.form-group').addClass('required');
           	inputemail.parents('.form-group').removeClass('invalid');
        }
        else{
        		inputemail.parents('.form-group').removeClass('has-error');
        		inputemail.parents('.form-group').removeClass('required');

        		if(!(validarEmail(inputemail.val()))){
        			inputemail.parents('.form-group').addClass('has-error');	
           			inputemail.parents('.form-group').addClass('invalid');
        		}
        		else{
        			inputemail.parents('.form-group').removeClass('has-error');
        			inputemail.parents('.form-group').removeClass('invalid');
        		}
        	}

        if(!inputpassword.val().length){
            inputpassword.parents('.form-group').addClass('has-error');
            inputpassword.parents('.form-group').addClass('required');
        }
        else{
        	inputpassword.parents('.form-group').removeClass('has-error');
        }

        if($form.find('has-error').length){
            return false;
        }
	}

	function validarEmail(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	
    	return re.test(email);
	}
});