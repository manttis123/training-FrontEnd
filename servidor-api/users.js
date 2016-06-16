module.exports = function (server) {
	var UsersModel = function (){
		var usuarios = [
		{
			name: 'pablo',
			email: 'pablo.petran@globallogic.com',
			comment: ''
		},
		{
			name: 'agustin',
			email: 'agustin.diaz@gl.com',
			comment: ''
		}
		];

		this.getUser = function(req, res, next){
			var userId = req.params.id;
			
			if(usuarios[userId]){
				res.send(200, usuarios[userId]);
			}
			else{
				res.send(404,'No User exists.');
			}

			return next();
		};

		this.getAllUser = function (req, res, next){
			i = usuarios.length-1;

			if(i < 0){
				res.send(404, 'No hay usuarios que listar.');
			}
			else{
				res.send(200, usuarios);
				}

			return next();
		};

		this.editUser = function (req, res, next){
			var userId = req.params.id,
				newName = req.params.name;
				newEmail = req.params.email;
				newComment = req.params.comment;

			if(usuarios[userId]){ //Evalúa que no sea "NULL" ni "UNDEFINED"
				if(newName && newName != ''){ //Evalúa que no sea "NULL" ni "UNDEFINED"
					usuarios[userId].name = newName;
				}

				if(newEmail && newEmail != ''){ //Evalúa que no sea "NULL" ni "UNDEFINED"
					usuarios[userId].email = newEmail;
				}

				if(newComment && newComment != ''){ //Evalúa que no sea "NULL" ni "UNDEFINED"
					usuarios[userId].comment = newComment;
				}
				res.send(200, usuarios[userId]);
			}
			else{
				res.send(404, 'El usuario no existe, creelo para editarlo.');
			}

			return next();
		};

		this.addUser = function (req, res, next){
			var user = {name:'', email:''};
		    user.name =req.params.name;
		    user.email =req.params.email;
		     
		   
		    usuarios.push(user);

		    var id = usuarios.length - 1;

		    res.send (200,usuarios[id]);
			
			return next();
		};

		this.deleteUser = function (req, res, next){
			var userId = req.params.id;

			if(usuarios[userId]){
				delete usuarios[userId];
				res.send (200, 'Usuario eliminado.');
			
				usuarios = usuarios.filter( function(usuario) { return !!usuario; });  // al usar delete, deja el espacio 
			}																		  // en undefined. Con el filter, filtro con "!!"
			else{																	 //	que hace true el "undefined" y el "null"
				res.send(404, 'El usuario no existe, no se puede eliminar.');
			}
			return next();
		};

		this.getComments = function (req, res, next){
			i = usuarios.length-1;

			if(i < 0){
				res.send(404, 'No hay usuarios que listar.');
			}
			else{
				res.send(200, usuarios.map(function(usuario) {
					return usuario.comment;
				}));
				}

			return next();
		};
	};

	var User = new UsersModel();


	/*Mostrar 1 Usuario */
	server.get({
		path: '/users/:id',
		version: '1.0.0'
	}, User.getUser);

	/*Mostrar todos los Usuarios */
	server.get({
		path: '/users',
		version: '1.0.0'
	}, User.getAllUser);

	/*Agregar 1 Usuario */
	server.post({
		path: '/users',
		version: '1.0.0'
	}, User.addUser);

	/*Modificar 1 Usuario */
	server.put({
		path: '/users/:id',
		version: '1.0.0'
	}, User.editUser);

	/*Eliminar 1 Usuario */
	server.del({
		path: '/users/:id',
		version: '1.0.0'
	}, User.deleteUser);

	/*Listar todos los Comentarios */
	server.get({
		path: '/comments',
		version: '1.0.0'
	}, User.getComments);

	
};