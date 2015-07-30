'use strict';

angular.module('bookclubApp')
  .directive('bookTile', function () {
    return {
      templateUrl: 'components/bookTile/bookTile.html',
      restrict: 'EA',
      scope: {
      	book: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });