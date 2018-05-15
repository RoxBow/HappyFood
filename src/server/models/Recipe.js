'use strict';

const Image = require('./Image');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema({
  title: String,
  description: String,
  ingredients: Array,
  img: { type: Schema.Types.ObjectId, ref: 'Image' },
  notes: Number
});

module.exports = mongoose.model('Recipe', Recipe);
