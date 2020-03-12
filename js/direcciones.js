direccionesModulo = (function () {
  var servicioDirecciones // Servicio que calcula las direcciones
  var mostradorDirecciones // Servicio muestra las direcciones

    // Calcula las rutas cuando se cambian los lugares de desde, hasta o algun punto intermedio
  function calcularRutasConClic () {
    document.getElementById('comoIr').addEventListener('change', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    document.getElementById('calcularMuchos').addEventListener('click', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    var listasLugares = document.getElementsByClassName('lugares')
    for (var j = 0; j < listasLugares.length; j++) {
      listasLugares[j].addEventListener('change', function () {
        if (document.getElementById('desde').value != '' && document.getElementById('desde').value != '') {
          direccionesModulo.calcularYMostrarRutas()
        }
      })
    }
  }

    // Agrega la dirección en las lista de Lugares Intermedios en caso de que no estén
  function agregarDireccionEnLista (direccion, coord) {
    var lugaresIntermedios = document.getElementById('puntosIntermedios')

    var haceFaltaAgregar = true
    for (i = 0; i < lugaresIntermedios.length; ++i) {
      if (lugaresIntermedios.options[i].text.replace(/\r?\n|\r/g, ' ') === direccion.replace(/\r?\n|\r/g, ' ')) {
        haceFaltaAgregar = false
      }
    }
    if (haceFaltaAgregar) {
      var opt = document.createElement('option')
      opt.value = coord
      opt.innerHTML = direccion
      lugaresIntermedios.appendChild(opt)
    }
  }

    // Agrega la dirección en las listas de puntos intermedios y lo muestra con el street view
  function agregarDireccionYMostrarEnMapa (direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    agregarDireccionEnLista(direccion, ubicacionTexto)
    mapa.setCenter(ubicacion)
    streetViewModulo.fijarStreetView(ubicacion)
    marcadorModulo.mostrarMiMarcador(ubicacion)
  }

  function agregarDireccion (direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    agregarDireccionEnLista(direccion, ubicacionTexto)
    mapa.setCenter(ubicacion)
  }

    // Inicializo las variables que muestra el panel y el que calcula las rutas//
  function inicializar () {
    calcularRutasConClic()
        // Agrega la direccion cuando se presioná enter en el campo agregar
    $('#agregar').keypress(function (e) {
      if (e.keyCode == 13) {
        var direccion = document.getElementById('agregar').value
        geocodificadorModulo.usaDireccion(direccion, direccionesModulo.agregarDireccion)
      }
    })
        // Calcula las rutas cuando se presioná enter en el campo desde y hay un valor disitnto a vacío en 'hasta'
    $('#desde').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('hasta').value != '') {
        direccionesModulo.calcularYMostrarRutas()        
      }
    })

        // Calcula las rutas cuando se presioná enter en el campo hasta y hay un valor disitnto a vacío en 'desde'
    $('#hasta').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('desde').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })
    servicioDirecciones = new google.maps.DirectionsService()
    mostradorDirecciones = new google.maps.DirectionsRenderer({
      draggable: true,
      map: mapa,
      panel: document.getElementById('directions-panel-summary'),
      suppressMarkers: true
    })
  }

    // Calcula la ruta entre los puntos Desde y Hasta con los puntosIntermedios
    // dependiendo de la formaDeIr que puede ser Caminando, Auto o Bus/Subterraneo/Tren
  function calcularYMostrarRutas () {
    /* Completar la función calcularYMostrarRutas , que dependiendo de la forma en que el usuario quiere ir de un camino al otro, calcula la ruta entre esas dos posiciones y luego muestra la ruta. */
    mostradorDirecciones.setMap(mapa);

    var origen = document.getElementById('desde').value;
    var destino = document.getElementById('hasta').value;
    var formaDeIr = document.getElementById('comoIr').value;
    var intermediatePoints = [];

    $("#puntosIntermedios option:selected").each(function() {
      intermediatePoints.push({
        location: $(this).text(),
        stopover: true
      });
    });  
    
    /*
    google.maps.TravelMode{
      DRIVING: "DRIVING", 
      WALKING: "WALKING", 
      BICYCLING: "BICYCLING", 
      TRANSIT: "TRANSIT", 
      TWO_WHEELER: "TWO_WHEELER"
    }
    */    
    if(formaDeIr == 'Auto') formaDeIr = google.maps.TravelMode.DRIVING;
    if(formaDeIr == 'Caminando') formaDeIr = google.maps.TravelMode.WALKING;
    if(formaDeIr == 'Bus/Subterraneo/Tren') formaDeIr = google.maps.TravelMode.TRANSIT;

    var request = {
      origin: origen,
      destination: destino,
      travelMode: formaDeIr,
      waypoints: intermediatePoints
    };
      // Servicio que calcula las direcciones 
    servicioDirecciones.route(request, function(result, status) {
      if (status == 'OK') {
        // Servicio muestra las direcciones
        mostradorDirecciones.setDirections(result); 
      }
    });

    /*waypoints[] especifica un conjunto de DirectionsWaypoint. Los waypoints modifican un trayecto haciendo que pase por las ubicaciones especificadas. Un waypoint se especifica como un literal de objeto con los campos:
    - location: especifica la ubicación del waypoint, como un LatLng , un objeto 
    google.maps.Place o un String que llevará geocodificación.
    - stopover: es un booleano que indica que el waypoint es un punto de detención en la ruta, el cual tiene el efecto de dividirla en dos.

    optimizeWaypoints especifica que la ruta en la que se usan los waypointsproporcionados puede optimizarse si se ordenan estos waypoints con mayor eficacia. Si el valor es true, el servicio de indicaciones devolverá los waypoints reordenados en un campo waypoint_order.*/
    
  }

  return {
    inicializar,
    agregarDireccion,
    agregarDireccionEnLista,
    agregarDireccionYMostrarEnMapa,
    calcularYMostrarRutas
  }
}())
