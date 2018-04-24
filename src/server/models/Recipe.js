'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema({
  ingredients: Array
});

module.exports = mongoose.model('Recipe', Recipe);
