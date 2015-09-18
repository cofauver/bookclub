'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Book = require('./book.model');

var testBook = {
  title: 'I Like Llamas'
}

describe('GET /api/books', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/books/:id', function() {

  var bookId;
  before(function(done){
    Book.create(testBook, function(err, book){
      bookId = book._id;
      done();
    });
  });

  it('should respond with a JSON representation of a book', function(done) {
    request(app)
      .get('/api/books/'+bookId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.title.should.equal('I Like Llamas');
        done();
      });
  });



  it('should have an accurate numberOfReaders attribute',function(done){
    request(app)
      .get('/api/books/'+bookId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        console.log(res.body);
        res.body.numberOfReaders.should.equal(2);
        done();
      });
  });
});

describe('POST /api/books', function(){
  var bookId;

  before(function(done) {
    // Clear users before testing
    Book.remove().exec().then(function() {
      Book.create(testBook, function(err, book){
        bookId = String(book._id);
        done();
      });
    });
  });


  it('should get the same id when POSTing the a book for the second time', function(done){
    request(app)
      .post('/api/books/')
      .send({book: testBook})
      .end(function(err, res){
        if (err) return done(err);
        res.body._id.should.equal(bookId);
        done();
      })
  });
});
