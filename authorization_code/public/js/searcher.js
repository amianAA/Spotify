$(document).ready(function(){
  var btn = $('#submit'),
      req = {};
    
//Obtencion del token bruto
  if ($('#token').text() !== ''){
      window.tokenStr = $('#token').text();
      $('#oauth').toggle('.oculto');
      $('.btn, .btn-primary').toggle('.oculto');
      $('.mostrar').toggle();
  }
//GET con la info del formulario
  btn.click(function() {
      var refreshToken = (function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams.refresh_token;
        }());
      var token = $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refreshToken
              }
            }).done(function(data) {
              token = data.access_token;
                });
      $.ajax({
   url: (function(){
            var url = 'https://api.spotify.com/',
                search = 'v1/search?q=',
                artist = '&type=artist',
                text = $('input').val();
            return (url+search+text+artist)
            })(),
   dataType: 'json',
   /*data: {
     	type: "artist",
      	query : $('input').val()
    },*/
   headers: {
       'Authorization': 'Bearer ' + token
   },
   success: function(response) {      
   			console.log(response);   	
  			//$divResults.load('https://api.spotify.com/v1/search?type=artist&query='+$('input').val(),completeFunction);   
  
   }
});/*$.ajax({
        url: (function(){
            var url = 'https://api.spotify.com/',
                search = 'v1/search?q=',
                artist = '&type=artist',
                name = 'name:',
                text = $('input').val();
            //return (url+search+text+artist)
            return ('https://api.spotify.com/v1/search?type=artist&query='+text)
        })(),
        dataType: "json",  
        headers: {
            'Authorization': 'Bearer '+tokenStr;
                }, 
        success: function(data, status, xhttp){
            event.preventDefault();  
            return data;
        }
    })*/
  });
})