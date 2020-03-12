lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
    /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la página (las direcciones ingresables por el usuario).
    Para esto creá un círculo con radio de 20000 metros y usalo para fijar los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
    
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
      // setBounds()para cambiar el área de búsqueda en una existente Autocomplete.              
    });
    
    //bounds es un google.maps.LatLngBounds objeto que especifica el área en la que buscar lugares. Los resultados están sesgados hacia, pero no restringidos a, lugares contenidos dentro de estos límites.
        

        /*
        InvalidValueError: not an instance of HTMLInputElement
        Uncaught (in promise) TypeError: Cannot read property 'activeElement' of undefined
        var $allInputs = $('[type="textbox"]');        
        $allInputs.each(function(input){
          var autocomplete = new google.maps.places.Autocomplete(input);
          autocomplete.setBounds(circulo.getBounds());          
        });
        */
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
    /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. 
    Luego, utilizá la función marcarLugares del marcadorModulo para marcar los lugares obtenidos.
    */
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
