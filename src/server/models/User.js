'use strict';
const Image = require('./Image');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      minlength: 3,
      maxlength: 10,
      unique: true,
      admin: Boolean,
      unique: true
    },
    password: {
      type: String,
      required: [true, "can't be blank"],
      minlength: 6
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: [true, "can't be blank"]
    },
    avatar: { type: Schema.Types.ObjectId, ref: 'Image' },
    favorites: Array,
    recipesDone: Array
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('User', User);
