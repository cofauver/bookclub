'use strict';

angular.module('bookclubApp')
  .controller('ProfileCtrl', function ($scope, $http, Auth, BookService, $location) {

  	$scope.book = {
  		title:'',
  		author:''
  	};

    $scope.addBook = function (){
    	BookService.addBook($scope.book).success(function(){
    		$scope.book.title = '';
			$scope.book.author = '';
    	});
    	


    };
    

  });