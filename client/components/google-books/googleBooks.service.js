'use strict';

angular.module('bookclubApp')
  .factory('GoogleBooksService', function ($location, $resource, $http, User, $cookieStore, $q) {
    return $resource('https://www.googleapis.com/books/v1/volumes', {
      maxResults: '10', 
      callback: 'JSON_CALLBACK', 
      key: 'AIzaSyBgikNfD95cFojhFR9hX9W4ApVtb1HcXAE'
    },
    { 
      get: { 
        method: 'JSONP' 
      }
    });
    // return $resource('https://www.googleapis.com/books/:verson/:resource', {
    //   version: 'v1',
    //   resource: 'volumes'
    // });
  });