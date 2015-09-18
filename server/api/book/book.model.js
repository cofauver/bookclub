'use strict';

var supergoose = require('supergoose');
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
  numberOfReaders: {type: Number, default: 0}
});

BookSchema.plugin(supergoose, {instance: mongoose});

module.exports = mongoose.model('Book', BookSchema);