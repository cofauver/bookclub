'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, $http, Auth, $location) {

  	$scope.book = {
  		title:'',
  		author:''
  	};

    $scope.addBook = function (){
    	console.log($scope.book);
    	//BookService.addBook(book)
    	$http.post('api/books', $scope.book).success(function(){
    		console.log('book posted');
	    	$http.get('api/books').success(function(booksList){
	    		console.log(booksList);
	    	});
	    });
	    $scope.book.title = '';
	    $scope.book.author = '';

    };
    

  });