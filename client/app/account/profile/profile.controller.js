'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, $http, Auth, BookService, GoogleBooksService, User, $location, $cookieStore) {

  	$scope.book = {
  		title:'',
  		author:''
  	};

    $scope.userBooks = [];
    $scope.userBookIds = [];
  	$scope.completeBookList = [];




    var updateUserBookList = function(bookIds){
      angular.forEach(bookIds, function(id){
        if($scope.userBookIds.indexOf(id) < 0){
          $scope.userBookIds.push(id);
          BookService.get({id:id},function(result){
            console.log(result);
            $scope.userBooks.push(result);
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



    $scope.addBookToUser = function (book){
      User.addBook({id:$scope.currentUser._id, book: book, user: $scope.currentUser}, 
        function(response){
          updateCurrentUser();
        }
      );
    };

    //creates a new book object in the backend
    var createNewBook = function(book){
      BookService.addBook({book: book}, function(responseBook){
        console.log(responseBook);
        updateCompleteBookList();
        $scope.addBookToUser(responseBook);
      });
    }

    $scope.addBook = function (book){
      console.log(book);
    	var bookObject = book;
    	if (book.volumeInfo){ //if it has this attribute it's in google book's object form, 
    		bookObject = book.volumeInfo; // so we need to do some tidying up.
    		bookObject.googleId = book.id;
    	}
    	createNewBook(bookObject);
    };
    

  });