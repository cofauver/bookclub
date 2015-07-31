'use strict';

angular.module('bookclubApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@id'
    },
    {
      addBook:{
        method: 'POST',
        params: {
          controller: 'books'
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
