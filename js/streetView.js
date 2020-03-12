streetViewModulo = (function () {
  var panorama // 'Visor' de StreetView

  function inicializar () {
    /* Completar la función inicializar()  que crea un panorama en una posición y lo muestra en la página. */
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'),
      {
        position: posicionCentral
      }
    );
    
  }

    // Actualiza la ubicación del Panorama
  function fijarStreetView (ubicacion) {
    /* Completar la función fijarStreetView que actualiza la posición de la variable panorama y cambia el mapa de modo tal que se vea el streetView de la posición actual. */
    panorama.setPosition(ubicacion); // setPosition()on the object after construction to change its location.
    mapa.setStreetView(panorama);
    //Vincula un StreetViewPanorama al mapa. Este panorama anula el StreetViewPanorama predeterminado, lo que permite que el mapa se una a un panorama externo fuera del mapa. Al establecer el panorama en nulo, el panorama incrustado predeterminado vuelve al mapa.
  }

  return {
    inicializar,
    fijarStreetView
  }
})()
