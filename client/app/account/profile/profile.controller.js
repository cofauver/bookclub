'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, $http, Auth, BookService, GoogleBooksService, User, $location, $cookieStore) {

  	$scope.book = {
  		title:'',
  		author:''
  	};
  	$scope.completeBookList = [];

  	$scope.googleBooks = GoogleBooksService.get({q:'Harry+Potter'});



  	var updateCompleteBookList = function(){
  		$scope.completeBookList = BookService.query()
  	};
  	
  	updateCompleteBookList();

  	if($cookieStore.get('token')) {
      var currentUser = User.get();
    }

  	// var user = User.get() //User service resource provides access for the backend it gives a get

  	$scope.bookList = User.books;

    $scope.addBook = function (){
    	BookService.addBook({user: currentUser, book: $scope.book}, function(){
    		updateCompleteBookList();
    	});
    };
    

  });