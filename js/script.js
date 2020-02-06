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
      console.log(data);

  },
    error : function (request, state, errors) {
      console.log('Errore ' + errors);

    }
  });

});
