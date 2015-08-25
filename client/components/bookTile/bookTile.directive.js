'use strict';

angular.module('bookclubApp')
  .directive('bookTile', function () {
    return {
      templateUrl: 'components/bookTile/bookTile.html',
      restrict: 'EA',
      scope: {
      	book: '=',
        overlayType:'='
      },
      controller: function($scope){

        $scope.addBook = function(){

        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });