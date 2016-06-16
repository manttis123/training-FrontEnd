var restify = require('restify');

var config = require('./config.js');

var usuarios = require('./users.js')


var server = restify.createServer({
	name: 'testServer'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

server.listen(config.server_port, config.server_ip, function(){
	console.log('%s activo en %s', server.name, server.url);
});

var HelloModel = function (req, res, next){ //Todo lo que llega del usuario, todo lo que responde el server del usuario, la función que sigue
	res.send(200, 'Hola Mundo'); //Código 200 = Todo OK
	return next(); 
};


server.get({
	path: '/',
	version: '1.0.0'
}, HelloModel);

usuarios(server);