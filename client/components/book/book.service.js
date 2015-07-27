'use strict';

angular.module('bookclubApp')
  .factory('BookService', function ($location, $rootScope, $http, User, $cookieStore, $q) {
  	


  	return {
  		addBook: function (user, book){
  			console.log(user);
  			if(book.title && book.author){

  				var promise = $http.post('api/books', book).success(function(){
		    		console.log('book posted');

		    		$http.post('api/users/'+user.id+'/books', {book:book,user:user}).success(function(){
	  					console.log('book added to user\'s list')
	  				});

			    	$http.get('api/books').success(function(booksList){
			    		console.log(booksList);
	    			});
	    		});
	    		return promise;
  			}
  		}
  	}
  })