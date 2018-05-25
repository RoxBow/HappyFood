'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema(
  {
    name: String,
    path: String,
    length: String,
    type: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Image', Image);
