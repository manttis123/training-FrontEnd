
var map;
var i = 0, marcador = 2;
var icon_BACKWARD, icon_FORWARD;
var id_map;
var iconos = ['a', 'b'];
var color = ['#07D300', '#0091FF'];
var coordinate = [];
var enviar_coor = {};

function initMap(userData) {
    icon_BACKWARD = google.maps.SymbolPath.BACKWARD_CLOSED_ARROW;
    icon_FORWARD = google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
    iconos[0] = icon_BACKWARD; 
    iconos[1] = icon_FORWARD;

    id_map = userData._id;

    var geolocalizacion = new google.maps.Geocoder();
   
    map.addListener('click', function(e){
    agregarMarcador(e.latLng, map);
    enviar_coor.lat = coordinate[0].lat;
    enviar_coor.lng = coordinate[0].lng;
    });

    document.getElementById('editcoordinate').onclick = enviarCoordenadas;
}


function enviarCoordenadas(){
    console.log(id_map);
    console.log(enviar_coor);
    var data = {"coordinate" : {"lat" : "",
                                "lng": ""
                               }
               };
    debugger;
    data.coordinate.lat = enviar_coor.lat;
    data.coordinate.lng = enviar_coor.lng;

    
      $.ajax({
      url: 'https://connectedin.herokuapp.com/person/' + id_map,
      method: 'PUT',
      data: JSON.stringify(data),
      contentType:'application/json',
      success: function(data){ 
        console.log(data);

      }

      })
}

function agregarMarcador(latLng, map){
  var coor = {};
	if(marcador){
    var marker = new google.maps.Marker({
      position: latLng,
        map: map,
        icon: {
                  path: iconos[i],
                  scale: 10,
                  strokeWeight:2,
                  strokeColor: color[i]
               },
        });
    map.panTo(latLng);
  	console.log(latLng.lat()); console.log(latLng.lng());

    coor.lat = latLng.lat();
    coor.lng = latLng.lng();
    coordinate.push(coor);

  	i++; marcador--;
	}
	else
		alert('Solo se pueden agregar'+marcador+'marcadores');
}
/*
function buscarDireccion(localizar, map) {

  var address = "Francia, Virson";
  localizar.geocode( 

  		{'address': address}, 

  		function(results, status){
    	if (status === google.maps.GeocoderStatus.OK) 
    	{
    		map.setCenter(results[0].geometry.location);
    		console.log(results[0].geometry.location.lat());
    		console.log(results[0].geometry.location.lng());
      	var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      	});
    	} 
    	else
    		alert('Error: ' + status);
  });

}*/