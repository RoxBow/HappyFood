const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;

const { urlMongoDB } = require('./dataServer');

const port = 3001; // set port server

/* # MODELS # */
const User = require('./models/User');
const Recipe = require('./models/Recipe');

/*
  Add this line before express' response to set CORS header:
  res.header("Access-Control-Allow-Origin", "*");
*/

mongoose.connect(urlMongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connect database'));
db.once('open', () => {
  console.log('Connected to database');
});

// set cors
app.use(cors()); 

// set helmet security
app.use(helmet());

// load statics files
app.use('/contrib', express.static(path.join(__dirname, 'contrib')))
app.use(express.static('dist'));

app.use(session({
  cookieName: 'session',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Config bodyParser
app.use(bodyParser.json()); // For parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded

app.get('/fetchFilters', (req, res, next) => {
  const dietLabels = [
    'balanced',
    'high-protein',
    'high-fiber',
    'low-fat',
    'low-carb',
    'low-sodium'
  ];

  const healthLabels = [
    'vegan',
    'vegetarian',
    'paleo',
    'dairy-free',
    'gluten-free',
    'wheat-free',
    'low-sugar',
    'egg-free',
    'peanut-free',
    'tree-nut-free',
    'soy-free',
    'fish-free',
    'shellfish-free',
    'alcohol-free',
    'celery-free',
    'crustacean-free',
    'kidney-friendly',
    'kosher',
    'low-potassium',
    'lupine-free',
    'mustard-free',
    'no-oil-added',
    'pescatarian',
    'pork-free',
    'red-meat-free',
    'sesame-free',
    'sugar-conscious'
  ];

  res.send({ dietLabels, healthLabels });
});

/**
 * ### RECIPE ###
 */

app.get('/api/searchRecipes', (req, res) => {
  let { recipeName, diets, health, isNotApi } = req.query;

  const conditionSearch = [];

  if (recipeName) conditionSearch.push({ label: { $regex: recipeName, $options: 'i' } });
  if (diets) conditionSearch.push({ diets: { $in: diets } });
  if (health) conditionSearch.push({ health: { $in: health } });

    Recipe.find(
      {
        $or: conditionSearch
      },
      (err, recipe) => {
        res.send(recipe);
      }
    ).populate('image');
});

app.get('/api/searchRecipesByIngredients', (req, res) => {
  const { ingredients } = req.query;

  Recipe.find(
    {
      ingredients: { $in: ingredients }
    },
    (err, recipe) => {
      res.send(recipe);
    }
  ).populate('image');
});

app.get('/api/getRandomRecipe', (req, res) => {
  // const allRandomRecipe = req.query.oldRecipeHistory
  // let present = true
  // let recipeToSend = null

    Recipe.count().exec((err, count) => {
      // Get a random entry
      const random = Math.floor(Math.random() * count);

      // Again query all recipes but only fetch one offset by our random
      Recipe.findOne()
        .populate('image')
        .skip(random)
        .exec((err, randomRecipe) => {
          res.send(randomRecipe);
        });
    });

  /* if (allRandomRecipe === undefined) {
    Recipe.count().exec((err, count) => {
      // Get a random entry
      const random = Math.floor(Math.random() * count);

      // Again query all recipes but only fetch one offset by our random
      Recipe.findOne()
        .skip(random)
        .exec((err, randomRecipe) => {
          res.send(randomRecipe);
        });
    });
  } else{


      Recipe.count().exec((err, count) => {
        // Get a random entry
        const random = Math.floor(Math.random() * count);

        // Again query all recipes but only fetch one offset by our random
        Recipe.findOne()
          .skip(random)
          .exec((err, randomRecipe) => {

            allRandomRecipe.forEach(element =>{
              let nv = JSON.parse(element)
              console.log(randomRecipe.id == nv._id)
            })
            res.send(randomRecipe);
          });
      });

    } */
});

app.get('/getInformationRecipe', (req, res) => {
  const { nameRecipe } = req.query;

  Recipe.findOne({ 'label': nameRecipe }, (err, recipe) => {
    if (err) return handleError(err);
    res.send({ recipe });
  }).populate('image');
});

/**
 * ### USER ###
 */

// Restrict user access
const checkAuthentication = (req,res,next) => {
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
      res.redirect('/');
  }
}

const redirects = {
  successRedirect: '/success',
  failureRedirect: '/failure'
};

app.post('/updateRecipeUser', checkAuthentication, (req, res) => {
  const { type, idRecipe } = req.body;

    User.findById(req.user.id, (err, user) => {
      if (err) return handleError(err);

      if(type === 'FAVORITES'){
        user.favorites.push(idRecipe);
      } else if(type === 'RECIPESDONE'){
        user.recipesDone.push(idRecipe);
      } else {
        console.log('Type request recipe - not defined / not exist');
        return;
      }

      user.save();
    });

});

app.post('/updateUser', checkAuthentication, (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) return handleError(err);
    
    for (const key in req.body) {
      user[key] = req.body[key];
    }

    user.save();
  });
});

app.get('/checkAuthentication', checkAuthentication, (req, res) => {
  if (req.user) {
    console.log('USER: ', req.user);
  } else {
    console.log('Problem user');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy( (err) => {
    res.redirect('/');
  });
});

app.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body

  User.register(new User({ username, email }), password, (err, user) => {
    if (err) console.log(err);
    
    passport.authenticate('local')(req, res, () => {
      req.session.save( (err) => {
        if (err) next(err);
        res.send('User saved in BDD');
      });
    });
  });
});

app.post('/login', passport.authenticate('local', redirects), (req, res) => {
  if ( req.session.passport.user != null ) {
    console.log('You correctly log in');
  } else {
    console.log('ERROR USER NOT EXIST');
  }
});

// Execute at the end
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Serveur running on ${port}`);
});
