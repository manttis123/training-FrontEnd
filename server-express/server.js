/*Siempre que hago modificaciones en este js tengo que 
volver a levantar el server*/

var express = require ('express'),
	server = express();
	bodyParser = require ('body-parser');
	personas = [];

server.use(express.static('public')); //Todo lo que tengo dentro de la carpeta public es estático (html)
server.use(bodyParser.json()); //Convierte al body en un objeto json
server.use(bodyParser.urlencoded({ extended: true }));

server.post ('/persona', function (req,res,next){
	if(req.body.nombre === 'marcelo'){
		return res.send({
			esMarcelo : true
		});
	}

	var pesrona = {
		'name' : req.body.nombre
	};
	res.send(persona);
})


server.post('/login', function(req, res, next){
	var username = req.body.username,
		password = req.body.password,
		respuesta = {
			ok: false
		};
	
	if (username === 'marcelo' && password == '123123'){
		respuesta.ok = true;
	}

	res.send(respuesta);
});

server.get('7persona/:indice', function(req,res,next){
	var pesronaADevolver = personas[req.params.indice];
	res.send(pesronaADevolver);
})
/*
server.post('/', function(req, res, next){
	res.send('Hello Wolrd');
});
*/
server.listen (3000, function (){
	console.log('Example app listening')
});