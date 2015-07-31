'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, $http, Auth, BookService, GoogleBooksService, User, $location, $cookieStore) {

  	$scope.book = {
  		title:'',
  		author:''
  	};
  	$scope.completeBookList = [];

  	$scope.refreshBooks = function(searchTerm){
  		GoogleBooksService.get({q: searchTerm}, function(resource){
	  		$scope.googleBooks = resource.items;
	  	});
  	}

  	$scope.deleteCompleteBookList = function (){
  		angular.forEach($scope.completeBookList, function(book){
  			console.log(book);
  			BookService.delete({id: book._id});
  		})
  	}

  	var updateCompleteBookList = function(){
  		$scope.completeBookList = BookService.query()
  	};
  	
  	updateCompleteBookList();

  	if($cookieStore.get('token')) {
      $scope.currentUser = User.get();
    }


    $scope.addBook = function (book){
    	var bookObject = book;
    	if (book.volumeInfo){
    		bookObject = book.volumeInfo;
    		bookObject.googleId = book.id;
    	}
    	BookService.addBook({book: bookObject}, function(){
    		updateCompleteBookList();
    		BookService.getByGoogleId({googleId: bookObject.id}, function(result){
    			console.log(result);
    		});
    	});
    	
    	// User.addBook({id: $scope.currentUser, book:bookObject});	


    };
    

  });