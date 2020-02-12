$(document).ready(function() {
  getGenre('film');
  $(document).on('change', 'select', function() {
    var genreSelected = $('select').val();
    console.log(genreSelected);
    $('.info').each(function(){
      var genre = $('#genre').html();
      console.log(genre);
      var splitGenre = genre.split(',');
      console.log(splitGenre);
      for (var i = 0; i < splitGenre.length; i++) {
        if (splitGenre[i] == genreSelected) {
          $(this).show();
        } else {
          $(this).hide();
        }
      }

    });
  });

  getGenre('series');
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
    });

    $(document).on('mouseenter', '.cover', function () {
      $(this).children('.info').show()
    });
    $(document).on('mouseleave', '.cover', function () {
      $(this).children('.info').hide();
    });


});



// Functions--------------------------

function printData(type, data) {
  for (var i = 0; i < data.length; i++) {
    var element = data[i];
    var title;
    var originalTitle;
    var source = $('#film-template').html();
    var template = Handlebars.compile(source);
    if (type == 'film') {
      title = element.title;
      originalTitle = element.original_title;
      var container = $('.films');
    } else if (type == 'series') {
      title = element.name;
      originalTitle = element.original_name;
      var container = $('.series')
    }
    var poster = 'img/missing.jpg';
    if (element.poster_path) {
      poster = 'https://image.tmdb.org/t/p/w342'+ element.poster_path;
    }
    var context = {
      type: type,
      title: title,
      original_title: originalTitle,
      original_language: getLanguage(element.original_language),
      vote_average: getRanking(element.vote_average),
      poster_path: poster,
      overview: element.overview,
      genre_ids: element.genre_ids
    };
    var html = template(context);
    container.append(html);
  }
}

function getLanguage(language) {
  var availableLanguage = ['de', 'en', 'es', 'fr', 'pt', 'it'];
  if (availableLanguage.includes(language)) {
    language = '<img class="flag" src="img/' + language + '.png" alt="language">';
  }
  return language;
}

function getRanking(vote) {
  vote = Math.floor(vote/2);
  var stars = '';
  for (var i = 1; i <=5; i++) {
    if (i <= vote) {
        stars += '<i class="fas fa-star gold"></i>';

    } else {
      stars += '<i class="far fa-star gold"></i>';
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
function getGenre(type) {
  var genre = [];
  var url;
  if (type == 'film') {
    url = 'https://api.themoviedb.org/3/genre/movie/list' ;
  } else if (type == 'series') {
    url = 'https://api.themoviedb.org/3/genre/tv/list';
  }
  $.ajax(
    {
      url : url,
      method : 'GET',
      data : {
        api_key :'5d285ad7ca8d96394a45a69142e4ce2f' ,
      },
      success: function (data) {
        var arrayGenre = data.genres;
        for (var i = 0; i < arrayGenre.length; i++) {
          genre.push(arrayGenre[i]);
        }
        console.log(genre);
        var source = $('#select').html();
        var template = Handlebars.compile(source);
        for (var j = 0; j < genre.length; j++) {
           var context = {
             id : genre[j].id,
             name : genre[j].name,
            }
           var html = template(context);
           $('.genre').append(html);
         }

      },
      error : function (request, state, errors) {
        console.log('Errore ' + errors);
      }
  });
}
// function printGenres(genre) {
//   var source = $('#select').html();
//   var template = Handlebars.compile(source);
//
//   for (var i = 0; i < genre.length; i++) {
//     var context = {
//       id : genre[i].id,
//       name : genre[i].name,
//      }
//     var html = template(context);
//     $('.genre').append(html);
//   }
// }
//
// function getGenre() {
//   $('.genre').html("<option value="+'all'+">All</option>");
//   var genre = [];
//   var url;
//   if (type == 'film') {
//     url = 'https://api.themoviedb.org/3/genre/movie/list'
//   }else if (type == 'series') {
//     url = 'https://api.themoviedb.org/3/genre/tv/list'
//   }
//   $.ajax(
//     {
//       url : url ,
//       method : 'GET',
//       data : {
//         api_key :'5d285ad7ca8d96394a45a69142e4ce2f' ,
//       },
//       success: function (data) {
//         var arrayGenre = data.genres;
//         for (var i = 0; i < arrayGenre.length; i++) {
//           genre.push(arrayGenre[i]);
//         }
//         printGenres(genre);
//         printGenres(genre);
//       },
//       error : function (request, state, errors) {
//         console.log('Errore ' + errors);
//       }
//   });
//
// }

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
  $('.films').html('');
  $('.series').html('');
  $('#type').val('');
}
