'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, $http, Auth, BookService, GoogleBooksService, User, $location, $cookieStore) {

  	$scope.book = {
  		title:'',
  		author:''
  	};

    $scope.userBookList = [];
  	$scope.completeBookList = [];


    var updateUserBookList = function(bookIds){
      angular.forEach(bookIds, function(id){
        if($scope.userBookList.indexOf(id) < 0){
          BookService.get({id:id},function(result){
            console.log(result);
            $scope.userBookList.push(result);
          });
        };
      })
    };



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
      $scope.currentUser = User.get(function(result){
        updateUserBookList(result.books)
      });
      
      // console.log($scope.currentUser);
    }
  	
  	updateCompleteBookList();
    updateCurrentUser();

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