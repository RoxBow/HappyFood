const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const { urlMongoDB } = require('./dataServer');
const { getProductBy } = require('./requestApi');

const port = 3001; // set port server

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

// set cors module on server express
app.use(cors());

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

app.post('/signup', (req, res) => {
  let user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  // Save user in BDD
  user.save(err => {
    if (err) {
      if (err.name === 'ValidationError') {
        /**
         *  # TODO #
         * Send all errors
         */
        for (field in err.errors) {
          res.send({ error: err.errors[field].message });
          break; // don't remove (avoid crash server 'cause of multiple response send)
        }
      } else if (err.name === 'BulkWriteError' && err.code === 11000) {
        res.send({ error: 'Email or username already exists !' });
      }
    } else {
      res.send({ message: 'User saved in BDD' });
    }
  });
});

app.post('/login', (req, res) => {

  id = req.body.id;
  pwd = req.body.password;

  var query = User.findOne({ 'username': id, 'password': pwd });
  
  //select username & password field
  query.select('username password');

  // execute the query at a later time
  query.exec(function (err, person) {
    if (err) console.log('Erro server', err);
    // Prints person value if matched"
    if(person){
      console.log({ message: 'OK', wo: person })
      res.send(person.id)
    } else{
      console.log({ message: 'NOT OK' })
    }
  });

  
});

app.listen(process.env.PORT || port, () => {
  console.log(`Serveur running on ${port}`);
});
