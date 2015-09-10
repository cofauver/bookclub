/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /books              ->  index
 * POST    /books              ->  create
 * GET     /books/:id          ->  show
 * GET     /books/title/:title/author/:author

 * PUT     /books/:id          ->  update
 * DELETE  /books/:id          ->  destroy
 */

'use strict';

var Book = require('./book.model');

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.json(200, books);
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    return res.json(book);
  });
};

// Get a single book by title
exports.showByTitle = function(req, res) {
  Book.findOne(req.params.title, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    return res.json(book);
  });
};


// Creates a new book in the DB.
exports.create = function(req, res) {
  console.log(req.body.book);
  Book.findOrCreate({title: req.body.book.title}, req.body.book, function (err, book, created) {
    console.log(created);
    if(err) { return handleError(res, err); }
    return res.json(201, book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    var updated = _.merge(book, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}



  // Trying to make functionality that allows a book to have a count of how many readers
  // also trying to avoid double-adding a book to the DB

  // Book.findById(req.body.book._id, function (error, foundBook){
  //   if(err){
  //     Book.create(req.body.book, function (err, book) {
  //       if(err) { return handleError(res, err); }
  //       return res.json(201, book);
  //     });
  //   }else{
  //     foundBook.numberOfReaders += 1;
  //     foundBook.save(function (err) {
  //       if (err) { return handleError(res, err); }
  //     });
  //     return res.send(409, {message: 'That book already exists in the database.'});
  //   }
  // })