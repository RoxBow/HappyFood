const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const mongoose = require('mongoose');

const port = 3001; // set port server
const axios = require('axios');

const cors = require('cors');

const { urlMongoDB } = require('./dataServer');

app.use(cors()); // set cors module on server express

/* 
  Add this line before express' response to set CORS header:
  res.header("Access-Control-Allow-Origin", "*");
*/

/* # MODELS # */
const User = require('./models/User');

mongoose.connect(urlMongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connect database'));
db.once('open', () => {
  console.log('Connected to database');
});

// Load statics files
app.use(express.static('dist'));

// Config bodyParser
app.use(bodyParser.json()); // For parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded

// Main page
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve('./dist/index.html'));
  next();
});

app.get('/user', (req, res) => {
  res.json({
    user: 'test'
  });
});

app.route('/createUser').post((req, res) => {
  let user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  // Save user in BDD
  user.save(err => {
    if (err) res.send(err);
    res.send({ message: 'User register' });
    console.log('user save in database');
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Serveur running on ${port}`);
});
