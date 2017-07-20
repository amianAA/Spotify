$(document).ready(function(){
  var btn = $('#submit');
  window.req = {};
//Obtencion del token bruto
  if ($('#token').text() !== ''){
      $('#oauth').toggle('.oculto');
      $('.btn, .btn-primary').toggle('.oculto');
      $('.mostrar').toggle();
  }
//GET con la info del formulario
  btn.click(function() {
      var token = (function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams.access_token;
        }());
      $.ajax({
            url: (function(){
            var url = 'https://api.spotify.com/',
                search = 'v1/search?q=',
                artist = '&type=artist',
                text = $('input').val();
            return (url+search+text+artist)
            })(),
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + token
                    },
            success: exito
        })
function exito(response) {
   			req = response.artists.items;
            var busqueda = $("#info");
            var album;
            busqueda.empty();
            req.forEach(function(artist){
                if(artist.images.length !== 0){
                    busqueda.append('<div class = "container">'+
                                        '<div class="row m-2">'+
                                            '<div class="col-2">'+
                                                '<img class="artist-picture" data="'+artist.id+'"src='+artist.images[0].url+'>'+
                                            '</div>'+
                                            '<div class="col-8">'+
                                                '<h2>'+artist.name+'</h2>'+
                                                '<h4>Genero: '+artist.genres+'</h4><h6>Popularidad: '+artist.popularity+'%</h6>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>');
                    }
            })
            album = $(".artist-picture");
            album.click(function(){
                  var token = (function getHashParams() {
                  var hashParams = {};
                  var e, r = /([^&;=]+)=?([^&;]*)/g,
                      q = window.location.hash.substring(1);
                  while ( e = r.exec(q)) {
                     hashParams[e[1]] = decodeURIComponent(e[2]);
                  }
                  return hashParams.access_token;
                }());
                var id = this.getAttribute('data');
              $.ajax({
                    url: (function(){
                    var url = 'https://api.spotify.com/',
                        searchArtist = 'v1/artists/',
                        album = '/albums';
                    return (url+searchArtist+id+album)
                    })(),
                    dataType: 'json',
                    headers: {
                        'Authorization': 'Bearer ' + token
                            },
                    success: albumes
                })
            })
            function albumes(response) {
                req = response.items;
                var busqueda = $("#info");
                busqueda.empty();
                console.log(response)
                req.forEach(function(album){
                    if(album.images.length !== 0){
                        busqueda.append('<div class = "container">'+
                                            '<div class="row m-2">'+
                                                '<div class="col-2">'+
                                                    '<img class="artist-picture" data="'+album.id+'"src='+album.images[0].url+'>'+
                                                '</div>'+
                                                '<div class="col-8">'+
                                                    '<h2>'+album.artists[0].name+'</h2>'+
                                                    '<h4>Album: '+album.name+'</h4>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>');
                        }
                })
        }
  }
})
})
