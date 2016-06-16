var express = require('express'),
  server = express(),
  bodyParser = require('body-parser'),
  personas = [
    {
      id: 1,
      nombre: 'Persona1',
      edad: 24,
      email: 'persona1@sarasa.com'
    },

    {
      id: 2,
      nombre: 'Persona2',
      edad: 25,
      email: 'persona2@sarasa.com'
    },

    {
      id: 3,
      nombre: 'Persona3',
      edad: 26,
      email: 'persona3@sarasa.com'
    },

    {
      id: 4,
      nombre: 'Persona4',
      edad: 27,
      email: 'persona4@sarasa.com'
    },

    {
      id: 5,
      nombre: 'Persona5',
      edad: 28,
      email: 'persona5@sarasa.com'
    }
  ];

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); 

//////////////Listar todas las personas//////////////
server.get('/personas', function(req, res, next){
  res.send(personas);
});

//////////////Listar 1 una persona según id//////////////
server.get('/personas/:id', function(req, res, next){ //si pongo :id lo obligo a poner un id
   //console.log(req.params.id);
   var userId = req.params.id;

  //Busco el ID en el vector
  i=0;
  while (i < personas.length-1 && personas[i].id != userId){
    //console.log(personas[i].id);
    //console.log("El user id es: "+userId);
    i++;
  }
  
  //Si lo encontró lo muestro sino mando mensaje error
  if(personas[i].id == userId){
    res.send (200, personas[i]);
  }                                                                        
  else{                                                                   
    res.send(404, 'El usuario no existe.');
  }
  return next();
});

//////////////Agregar una persona//////////////
server.post('/personas', function(req, res, next){
  var personaData = {
      id: personas[personas.length-1].id +1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      email: req.body.email
  };

  //console.log(req.body);
  personas.push(personaData);
  res.send(200,'Se agregó la persona correctamente');
  return next();
});

//////////////Borrar una persona//////////////
server.delete('/personas', function(req, res, next){
 
  var userId = req.body.id;

  if(!(userId && userId.length)){
    res.send(400, 'Ingrese un Id a eliminar.');
    return next();
  }
  //Busco el ID en el vector
  i=0;
  while (i < personas.length-1 && personas[i].id != userId){
    //console.log(personas[i].id);
    //console.log("El user id es: "+userId);
    i++;
  }
  
  //Si lo encontró lo elimino sino mando mensaje error
  if(personas[i].id == userId){
    delete personas[i];
    res.send (200, 'Usuario eliminado.');
      
    personas = personas.filter( function(persona) { return !!persona; });  // al usar delete, deja el espacio 
  }                                                                        // en undefined. Con el filter, filtro con "!!"
  else{                                                                  // que hace true el "undefined" y el "null"
    res.send(404, 'El usuario no existe, no se puede eliminar.');
  }
  return next();
});

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

/*get gral
get espc
put
post*/
//add
//editar