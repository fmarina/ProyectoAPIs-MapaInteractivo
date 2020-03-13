geocodificadorModulo = (function () {
  var geocodificador // Geocodificador que dada una dirección devuelve una coordenada
 
    // Permite obtener las coordenadas y las usa con la función llamada por parámtero
  function usaDireccion (direccion, funcionALlamar) {    
    geocodificador.geocode( {'address': direccion}, function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        var direccionGeocodificada = results[0].geometry.location;
        funcionALlamar(direccion, direccionGeocodificada);
      }
      else{
        swal({
          title: "Hubo un problema",
          text: "El pedido no pudo completarse. Motivo:" + estado,
          type: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

    // Inicializo el geocoder que obtiene las coordenadas a partir de una dirección
    // La variable dirección es igual al texto ingresado por el usuario
    // Llama a la función usaDirecciin para agregarla a los listados y mostrarlo en el mapa
  function inicializar () {
    var that = this
    geocodificador = new google.maps.Geocoder()    

        // cuando se presiona la tecla enter en el campo direccion, se agrega la dirección y se muestra en el mapa
    document.querySelector('#direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
      if (key === 13) { // 13 is enter
                // code for enter
        var direccion = document.getElementById('direccion').value
        that.usaDireccion(direccion, direccionesModulo.agregarDireccionYMostrarEnMapa)
      }
    })
  }

  return {
    usaDireccion,
    inicializar
  }
})()
