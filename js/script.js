// My api: 5d285ad7ca8d96394a45a69142e4ce2f

$(document).ready(function() {
  $('#search').click(function() {
    $('.covers').html('');
    var query = $('#type').val();
    console.log(query);
    $.ajax(
      {
        url : 'https://api.themoviedb.org/3/search/movie',
        method : 'GET',
        data : {
          api_key : '5d285ad7ca8d96394a45a69142e4ce2f',
          query : query
        },
        success: function (data) {
          console.log(data.results);
          var arrayFilms = data.results;
          printFilms(arrayFilms);
        },
        error : function (request, state, errors) {
          console.log('Errore ' + errors);

        }

    });
  });
});



// Functions--------------------------

function printFilms(array) {
  for (var i = 0; i < array.length; i++) {
    var film = array[i];
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

}
