'use strict';

angular.module('bookclubApp')
  .directive('bookTile', function () {
    return {
      templateUrl: 'components/bookTile/bookTile.html',
      restrict: 'EA',
      scope: {
      	book: '=',
        overlayType:'=',
        addBook: '&'
      },
      controller: function($scope){


      },
      link: function (scope, element, attrs) {
      }
    };
  });