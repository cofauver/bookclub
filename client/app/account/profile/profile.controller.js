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

    var updateCurrentUser = function(){
      $scope.currentUser = User.get();
      console.log($scope.currentUser);
    }
  	
  	updateCompleteBookList();

  	if($cookieStore.get('token')) {
      $scope.currentUser = User.get();
    }


    $scope.addBook = function (book){
    	var bookObject = book;
    	if (book.volumeInfo){ //if it has this attribute it's in google book's object form, 
    		bookObject = book.volumeInfo; // so we need to do some tidying up.
    		bookObject.googleId = book.id;
    	}
    	BookService.addBook({book: bookObject}, function(responseBook){
    		updateCompleteBookList();
        
        User.addBook({id:$scope.currentUser._id, book: responseBook, user: $scope.currentUser}, 
          function(response){
            updateCurrentUser();
          }
        );
    	});
    	

    };
    

  });