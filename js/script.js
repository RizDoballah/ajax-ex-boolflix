$(document).ready(function() {
  $('#search').click(function() {
    var query = $('#type').val();
    console.log(query);
    getFilms(query);
    reset();
  });

  $('#type').keypress(
    function(event) {
      var query = $('#type').val();
      if (event.which == 13) {
        getFilms(query);
        reset();
      }
    }
  );
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
      vote_average: Math.round((Math.round(film.vote_average) / 2))
    }
    var html = template(context);
    $('.covers').append(html);

    // var starTotal = 5;
    //
    // var rating = context.vote_average;
    // for (var i = 1; i < 6; i++) {
    //   if (rating == 1 ) {
    //     $('#film-template').children().find('.star1').addClass('full')
    //   }
    // }
  };

}





function getFilms(string) {
  var url = 'https://api.themoviedb.org/3/search/movie';
  var api_key = '5d285ad7ca8d96394a45a69142e4ce2f';
  $.ajax(
    {
      url : url ,
      method : 'GET',
      data : {
        api_key :api_key ,
        query : string
      },
      success: function (data) {
        console.log(data.results);
        var arrayFilms = data.results;
        if (arrayFilms.length == 0) {
        $('.covers').text('Messaggio di Boolflix "Titolo non disponibile"');
      } else {
        printFilms(arrayFilms);
      }
      },
      error : function (request, state, errors) {
        console.log('Errore ' + errors);
      }
  });
}

function reset() {
  $('.covers').html('');
  $('#type').val('');
}
