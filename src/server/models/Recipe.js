'use strict';
const mongoose = require('mongoose');
const Image = require('./Image');
const Schema = mongoose.Schema;

const Recipe = new Schema({
  label: String,
  description: String,
  category: String,
  steps: Array,
  ingredients: [{ type: String, lowercase: true }],
  diets: {
    type: [{ type: String, lowercase: true }]
  },
  health: {
    type: [{ type: String, lowercase: true }]
  },
  calories: String,
  note: Number,
  source: String,
  image: { type: Schema.Types.ObjectId, ref: 'Image' }
});

module.exports = mongoose.model('Recipe', Recipe);
