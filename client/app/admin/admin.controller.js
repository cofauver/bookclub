'use strict';

angular.module('bookclubApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, BookService) {


    var bookObject;
    var bookObjectList = [];
    
    // Use the User $resource to fetch all users
    $scope.users = User.query(function(){
      angular.forEach($scope.users, function(user){
        user.bookObjects = [];
        angular.forEach(user.books , function(book){
          BookService.get({id:book}, function(bookObject){
            user.bookObjects.push(bookObject);
          });

          
        });
      }); 
    });

    $scope.books = BookService.query();
    

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
