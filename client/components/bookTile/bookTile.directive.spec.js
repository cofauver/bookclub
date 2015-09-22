'use strict';

describe('Directive: bookTile', function () {

  // load the directive's module and view
  beforeEach(module('bookclubApp'));
  beforeEach(module('components/bookTile/bookTile.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  /*This test produced by ```yo angular-fullstack:directive bookTile``` command*/
  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<book-tile></book-tile>');
  //   element = $compile(element)(scope);
  //   scope.$apply();
  //   expect(element.text()).toBe('this is the bookTile directive');
  // }));
});