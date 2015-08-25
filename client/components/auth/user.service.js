'use strict';

angular.module('bookclubApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller/:controllerId', {
      id: '@id'
    },
    {
      addBook: {
        method: 'POST',
        params: {
          controller: 'books'
        }
      },
      deleteBook: {
        method: 'DELETE',
        params: {
          controller: 'books',
          controllerId: '@bookId'
        }
      },
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
