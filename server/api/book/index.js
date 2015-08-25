'use strict';

var express = require('express');
var controller = require('./book.controller');
var config = require('../../config/environment');

var router = express.Router();

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /books              ->  index
 * POST    /books              ->  create
 * GET     /books/:id          ->  show
 * PUT     /books/:id          ->  update
 * DELETE  /books/:id          ->  destroy
 */

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;