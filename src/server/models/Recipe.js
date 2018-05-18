'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Our model -> api's model
 * label -> label
 * description -> none
 * steps -> ingredientLines
 * ingredients -> ingredients
 * diets -> dietLabels
 * health -> healthLabels
 * calories -> calories
 * image -> image
 */

const Recipe = new Schema({
  label: String,
  description: String,
  steps: Array,
  ingredients: Array,
  diets: {
    type: [{ type: String, lowercase: true }]
  },
  health: {
    type: [{ type: String, lowercase: true }]
  },
  calories: String,
  note: Number,
  image: String
});

module.exports = mongoose.model('Recipe', Recipe);
