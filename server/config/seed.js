/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');


User.create({
  provider: 'local',
  name: 'Test User',
  email: 'test@test.com',
  password: 'test'
}, {
  provider: 'local',
  role: 'admin',
  name: 'Cory',
  email: 'cofauver@gmail.com',
  password: 'dogfood'
}, function() {
    console.log('finished populating users');
  }
);
