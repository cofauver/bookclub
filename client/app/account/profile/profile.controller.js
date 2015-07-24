'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, Auth, BookService, $location) {

    $scope.addBook = function(){
    	//BookService.addBook(book)
    	$http.post('api/books', $scope.book).success(function(){
	    	$http.get('api/books').success(function(booksList){
	    		console.log(booksList);
	    	});
	    });
	    $scope.book.title = '';
	    $scope.book.author = '';

    };
    

  });