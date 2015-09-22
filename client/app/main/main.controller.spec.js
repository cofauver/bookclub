'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bookclubApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/books')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  /*The original test as it came with the boilerplate*/
  // it('should attach a list of things to the scope', function () {
  //   $httpBackend.flush();
  //   expect(scope.awesomeThings.length).toBe(4);
  // });
});
