'use strict';

angular.module('bookclubApp')
  .factory('BookService', function ($resource) {
    return $resource('/api/books/:id/:controller', {
      id: '@_id',
    },
    {
      addBook: {
        method: 'POST'
      },
      getByGoogleId: {
        method: 'GET',
        params: {
          id:'gId',
          controller: '@googleId'
        }
      }
		});
  });


  // 	return {
  // 		addBook: function (user, book){
  // 			console.log(user);
  // 			if(book.title && book.author){
  // 				console.log(book);

  // 				var promise = $http.post('api/books', book).success(function(){
		//     		console.log('book posted');



		//     		$http.post('api/users/'+user._id+'/books', {book:book,user:user}).success(function(){
		//     			console.log(book)
	 //  					console.log('added to user\'s list')
	 //  				});

		// 	    	$http.get('api/books').success(function(booksList){
		// 	    		console.log(booksList);
	 //    			});
	 //    		});
	 //    		return promise;
  // 			}
  // 		}
  // 	}
  // })