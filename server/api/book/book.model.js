'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  authors: Array,
  description: String,
  googleId: String,
  publisher: String,
  industryIdentifiers: Array,
  imageLinks: Object,
  pageCount: Number,
  previewLink: String,
  infoLink: String,
  numberOfReaders: Number
});

module.exports = mongoose.model('Book', BookSchema);