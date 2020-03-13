lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario y establece los límites con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
    var circulo = new google.maps.Circle({
      map: mapa,
      center: posicionCentral,
      radius: 20000,
      visible: false
    });

    var allInputs = document.querySelectorAll('[type="textbox"]');
    allInputs.forEach(input => {
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.setBounds(circulo.getBounds());
      // setBounds()para cambiar el área de búsqueda en una existente autocomplete.              
    });    
    //bounds es un google.maps.LatLngBounds objeto que especifica el área en la que buscar lugares. Los resultados están sesgados hacia, pero no restringidos a, lugares contenidos dentro de estos límites.
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar
  function buscarCerca (posicion) {
    var tipoDeLugar = document.getElementById("tipoDeLugar").value;
    var radio = document.getElementById("radio").value || 500; 
    var request = {
      location: posicion,
      radius: radio,
      type: [tipoDeLugar]
    };    
    servicioLugares.nearbySearch(request, marcadorModulo.marcarLugares);
  }

  return {
    inicializar,
    buscarCerca
  }
})()
