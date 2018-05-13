(function () {
    'use strict';
    angular
        .module('app')
        .factory('feedService', feedService);
    feedService.inject = ['$http'];
    function feedService($http) {
         var apiUrl=`http://localhost:8000/movie/`;
         var currentUser=JSON.parse(localStorage.getItem('currentUser')).userId;
        return {
            getMovies: getMovies,
            getTrailer:getTrailer,
            addMovie:addMovie,
            addRate:addRate,
            addComment:addComment,
            getComments:getComments,
            getRates:getRates,
        };
        
        function getRates() {
         return  $http.get(apiUrl+`getRates?id=${currentUser}`).
                then(function (response) {
                  return response.data.rates;
                }).
                catch(function (err) {
                  console.log(err)
                });
        }
        function getComments(movieId) {
         return  $http.get(apiUrl+`getComments?id=${currentUser}&${movieId}`).
                then(function (response) {
                  return response.data.rates;
                }).
                catch(function (err) {
                  console.log(err)
                });
        }
        function addMovie(argument) {
            $http.post(apiUrl+`add`,argument).
                then(function (response) {
                  console.log(response)
                }).
                catch(function (err) {
                  console.log(err)
                });
        }
        function addRate(argument) {
          return $http.post(apiUrl+`rate`,argument).
                then(function(response) {
                 console.log(response)
                }).
                catch(function (err) {
                  console.log(err)
                });
        }
        function addComment(argument) {
           return $http.post(apiUrl+`comment`,argument).
                then(function (response) {
                  return response.data;
                }).
                catch(function (err) {
                  console.log(err)
                });
        }
        function getMovies() {
                return $http.get( `https://api.themoviedb.org/3/discover/movie?api_key=2be52bc734f6969769485aeb5f7f54bd&primary_release_date.gte=2017-3-12&primary_release_date.lte=2018-4-12`)
                    .then(getMoviesComplete)
                    .catch(getMoviesFailed);
             }
       function getMoviesComplete(response) {
            return response.data.results;
        }
        function getMoviesFailed(error) {
            console.log('XHR Failed for getMovies. ' + error.data);
        }
        

       function getTrailer(movieId,callback) {
                var url=`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2be52bc734f6969769485aeb5f7f54bd&language=en-US`;
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() { 
                  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
             callback(xmlHttp.responseText);
            }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
      }
        
    }
})();