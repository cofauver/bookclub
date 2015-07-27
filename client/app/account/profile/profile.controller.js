'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, $http, Auth, BookService, User, $location, $cookieStore) {

  	$scope.book = {
  		title:'',
  		author:''
  	};

  	if($cookieStore.get('token')) {
      var currentUser = User.get();
    }

  	// var user = User.get() //User service resource provides access for the backend it gives a get

  	$scope.bookList = User.books;

    $scope.addBook = function (){
    	BookService.addBook(currentUser, $scope.book).success(function(){
    		$scope.book.title = '';
			$scope.book.author = '';
    	});
    	


    };
    

  });