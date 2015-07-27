'use strict';

angular.module('bookclubApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id',
      books: '@books'
    },
    {
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
