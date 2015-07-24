'use strict';

angular.module('bookclubApp')
  .factory('BookService', function ($location, $rootScope, $http, User, $cookieStore, $q) {
  	return {
  		addBook: function (book){
  			if(book.title && book.author){
  				$http.post('api/books', book)
  			}
  		}
  	}
  })