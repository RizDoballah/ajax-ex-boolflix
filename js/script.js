// My api: 5d285ad7ca8d96394a45a69142e4ce2f

$(document).ready(function() {
  $.ajax(
    {
    url : 'https://api.themoviedb.org/3/search/movie',
    method : 'GET',
    data : {
      api_key : '5d285ad7ca8d96394a45a69142e4ce2f',
      query : 'ritorno al futuro'
    },
    success: function (data) {
      console.log(data.results);
      var arrayFilms = data.results
      for (var i = 0; i < arrayFilms.length; i++) {
        var film = arrayFilms[i];
        console.log(film);
        var source = $('#film-template').html();
        var template = Handlebars.compile(source);
        var context = {
          title: film.title,
          original_title: film.original_title,
          original_language: film.original_language,
          vote_average: film.vote_average
        };
        var html = template(context);
        $('.covers').append(html);
      }
      // original_language: "en"
      // original_title: "Back to the Future"
      // title: "Back to the Future"
      // vote_average: 8.2

  },
    error : function (request, state, errors) {
      console.log('Errore ' + errors);

    }
  });

});
