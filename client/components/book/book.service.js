'use strict';

angular.module('bookclubApp')
  .factory('BookService', function ($location, $rootScope, $http, User, $cookieStore, $q) {
  	return {
  		addBook: function (book){
  			if(book.title && book.author){
  				var promise = $http.post('api/books', book).success(function(){
		    		console.log('book posted');
			    	$http.get('api/books').success(function(booksList){
			    		console.log(booksList);
	    			});
	    		});
	    		return promise;
  			}
  		}
  	}
  })