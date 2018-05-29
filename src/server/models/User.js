'use strict';

const mongoose = require('mongoose');
const Image = require('./Image');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "can't be blank"],
      minlength: [3, 'username too short'],
      maxlength: [10, 'username too long'],
      unique: true,
      admin: Boolean
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      unique: true,
      trim: true
    },
    avatar: { type: Schema.Types.ObjectId, ref: 'Image' },
    favorites: [{ type: String }],
    recipesDone: [{ type: String }]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
