streetViewModulo = (function () {
  var panorama // 'Visor' de StreetView

  // crea un panorama en una posición y lo muestra en la página.
  function inicializar () {
    
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'),
      {
        position: {lat: -31.4199445, lng: -64.1891036}
      }
    );    
  }

    // Actualiza la ubicación del Panorama
  function fijarStreetView (ubicacion) {
    panorama.setPosition(ubicacion); // setPosition()on the object after construction to change its location.
    mapa.setStreetView(panorama); //Vincula un StreetViewPanorama al mapa. Este panorama anula el StreetViewPanorama predeterminado, lo que permite que el mapa se una a un panorama externo fuera del mapa. Al establecer el panorama en nulo, el panorama incrustado predeterminado vuelve al mapa.
  }

  return {
    inicializar,
    fijarStreetView
  }
})()
