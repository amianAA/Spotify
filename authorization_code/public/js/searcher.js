$(document).ready(function () {
  event.preventDefault()
  var btn = $('#submit');
  var req = {};
  var token;
  var album;
  var busqueda = $("#info");
  //Obtencion del token bruto
  if ($('#token').text() !== '') {
    $('#oauth').toggle('.oculto');
    $('.btn, .btn-primary').toggle('.oculto');
    $('.mostrar').toggle();
  }
  //Funcion para la obtencion del token de autentificacion
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams.access_token;
  }
  //GET para obtener resultados de busqueda por artista
  btn.click(function () {
    token = getHashParams()
    $.ajax({
      url: (function () {
        var url = 'https://api.spotify.com/',
          search = 'v1/search?q=',
          artist = '&type=artist',
          text = $('input').val();
        return (url + search + text + artist)
      })(),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      success: artistsFound
    })
  })
  //Funcion que formatea los datos del objeto recibido tras busqueda
  function artistsFound(response) {
    req = response.artists.items;
    busqueda.empty();
    req.forEach(function (artist) {
      if (artist.images.length !== 0) {
        busqueda.append('<div class = "container">' +
          '<div class="row m-2">' +
          '<div class="col-2">' +
          '<img class="artist-picture" data="' + artist.id + '"src=' + artist.images[0].url + '>' +
          '</div>' +
          '<div class="col-8">' +
          '<h2>' + artist.name + '</h2>' +
          '<h4>Genero: ' + artist.genres + '</h4><h6>Popularidad: ' + artist.popularity + '%</h6>' +
          '</div>' +
          '</div>' +
          '</div>');
      }
    })
    album = $(".artist-picture");
    album.click(ajaxAlbumes);
  }
  //Funcion para la peticion de los datos del album al hacer click en foto de artista
  function ajaxAlbumes() {
    token = getHashParams()
    var id = this.getAttribute('data');
    $.ajax({
      url: (function () {
        var url = 'https://api.spotify.com/',
          searchArtist = 'v1/artists/',
          album = '/albums';
        return (url + searchArtist + id + album)
      })(),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      success: formatAlbumes
    })
  }
  //Funcion que formatea los datos de un artista clickado
  function formatAlbumes(response) {
    req = response.items;
    busqueda.empty();
    req.forEach(function (album) {
      if (album.images.length !== 0) {
        busqueda.append('<div class = "container">' +
          '<div class="row m-2">' +
          '<div class="col-2">' +
          '<img class="artist-picture" data="' + album.id + '"src=' + album.images[0].url + '>' +
          '</div>' +
          '<div class="col-8">' +
          '<h2>' + album.artists[0].name + '</h2>' +
          '<h4>Album: ' + album.name + '</h4>' +
          '</div>' +
          '</div>' +
          '</div>');
      }
    })
  }
})
