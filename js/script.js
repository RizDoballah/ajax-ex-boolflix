$(document).ready(function() {
  $('#search').click(function() {
    var query = $('#type').val();
    console.log(query);
    getFilms(query);
    getSeries(query);
    reset();
  });

  $('#type').keypress(
    function(event) {
      var query = $('#type').val();
      if (event.which == 13) {
        getFilms(query);
        getSeries(query);
        reset();
      }
    }
  );
});



// Functions--------------------------

function printData(type, data) {
  for (var i = 0; i < data.length; i++) {
    var data = data[i];
    var title;
    var originalTitle;
    var source = $('#film-template').html();
    var template = Handlebars.compile(source);
    if (type == 'film') {
      title = data.title;
      originalTitle = data.original_title;
      var container = $('.films');
    } else if (type == 'series') {
      title = data.name;
      originalTitle = data.original_name;
      var container = $('.series')
    }
    var context = {
      type: type,
      title: title,
      original_title: originalTitle,
      original_language: getLanguage(data.original_language),
      vote_average: getRanking(data.vote_average)
    };
    var html = template(context);
    container.append(html);
  }
}

function getLanguage(language) {
  var availableLanguage = ['de', 'en', 'es', 'fr', 'pt', 'it'];
  if (availableLanguage.includes(language)) {
    language = '<img src="img/' + language + '.png" alt="language">';
  }
  return language;
}

function getRanking(vote) {
  vote = Math.floor(vote/2);
  var stars = '';
  for (var i = 1; i <=5; i++) {
    if (i <= vote) {
        stars += '<i class="fas fa-star"></i>';

    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;

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
        $('.films').text('Messaggio di Boolflix "Titolo non disponibile"');
      } else {
        printData('film', arrayFilms);
      }
      },
      error : function (request, state, errors) {
        console.log('Errore ' + errors);
      }
  });
}

function getSeries(string) {
  var url = 'https://api.themoviedb.org/3/search/tv';
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
        var arraySeries = data.results;
        if (arraySeries.length == 0) {
        $('.series').text('Messaggio di Boolflix "Titolo non disponibile"');
      } else {
        printData('series', arraySeries);
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
