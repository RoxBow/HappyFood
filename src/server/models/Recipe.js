'use strict';
const mongoose = require('mongoose');
const Image = require('./Image');
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
  // ingredients: [
  //   {
  //     text: String,
  //     weight: String
  //   }
  //   type: [{ type: String, lowercase: true }]
  // ],
  diets: {
    type: [{ type: String, lowercase: true }]
  },
  health: {
    type: [{ type: String, lowercase: true }]
  },
  calories: String,
  note: Number,
  image: { type: Schema.Types.ObjectId, ref: 'Image' }
});

module.exports = mongoose.model('Recipe', Recipe);
