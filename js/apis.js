var mapa; 

  //Coordenadas donde se va a centrar el mapa
var posicionCentral = {lat: -31.4076714, lng: -64.2127537};

// Se inicializa el mapa con el valor de zoom y una locación en el medio
function inicializarMapa () {
    mapa = new google.maps.Map(document.getElementById('map'), {
      center: posicionCentral,
      zoom: 12
    });
  
  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()
}
