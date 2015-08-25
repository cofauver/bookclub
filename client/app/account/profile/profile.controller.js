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
      console.log('updating');
      $scope.currentUser = User.get(function(result){
        updateUserBookList(result.books)
      });
    };
  	
  	updateCompleteBookList();
    updateCurrentUser();

  	if($cookieStore.get('token')) {
      $scope.currentUser = User.get();
    }


    //adds a new book to the User in the DB
    $scope.addBookToUser = function (book){
      User.addBook({id:$scope.currentUser._id, book: book, user: $scope.currentUser}, 
        function(response){
          updateCurrentUser();
        }
      );
    };

    //creates a new book object in the backend
    var createNewBook = function(book, callback){
      BookService.addBook({book: book}, function(responseBook){
        console.log(responseBook);
        updateCompleteBookList();
        callback(responseBook); //then add the book to the user
      });
    }

    $scope.addBook = function (book){
    	var bookObject = book;
    	if (book.volumeInfo){ //if it has this attribute it's in google book's object form, 
    		bookObject = book.volumeInfo; // so we need to do some tidying up.
    		bookObject.googleId = book.id;
    	}
    	createNewBook(bookObject, function(responseBook){ //after creating a new book on the backend
        $scope.addBookToUser(responseBook); // add it to the user object on the backend
      });
    };
    

    $scope.removeBookFromUser = function (book){
      console.log(book);
      var params = {id:$scope.currentUser._id, controllerId:book._id}
      User.deleteBook(params, function(response){
        var indexToDelete = $scope.userBooks.indexOf(book);
        $scope.userBooks.splice(indexToDelete,1);
      });
    };

  });