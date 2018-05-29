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
const RateLimit = require('express-rate-limit');
const { urlMongoDB } = require('./dataServer');

/* # MODELS # */
const User = require('./models/User');
const Recipe = require('./models/Recipe');

const port = 3001; // set port server

//const { saveRecipeMealDB  } = require('./requestApi/themealdbRequest.js')
const { saveRecipeEdamam  } = require('./requestApi/edamamRequest.js')
const { saveRecipeEdama  } = require('./requestApi/edamamRequest.js')
const { saveRecipeEdam  } = require('./requestApi/edamamRequest.js')

/*
  Add this line before express' response to set CORS header:
  res.header("Access-Control-Allow-Origin", "*");
*/

mongoose.connect(urlMongoDB);
const db = mongoose.connection;

// security (limit number request)
const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
  delayMs: 0 // disabled
});

app.use(cors())

app.use('/', apiLimiter);

// set helmet security
app.use(helmet());

// load statics files
app.use('/contrib', express.static(path.join(__dirname, 'contrib')));
app.use(express.static('dist'));

app.use(
  session({
    cookieName: 'session',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Config bodyParser
app.use(bodyParser.json()); // For parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  })
); // for parsing application/x-www-form-urlencoded

db.on('error', console.error.bind(console, 'Error connect database'));
db.once('open', () => {
  console.log('Connected to database');
});

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

    // Query all recipes but only fetch one offset by our random
    Recipe.findOne()
      .populate('image')
      .skip(random)
      .exec((err, randomRecipe) => {
        res.send(randomRecipe);
      });
  });

});

app.get('/getInformationRecipe', (req, res) => {
  const { nameRecipe } = req.query;

  Recipe.findOne({ label: nameRecipe }, (err, recipe) => {
    if (err) res.status(500).send({ err });
    res.send({ recipe });
  }).populate('image');
});

/**
 * ### USER ###
 */

// Restrict user access
const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    console.log('Not authenticated');
    res.redirect('/');
  }
};

app.get('/user/fetchUserInformation', checkAuthentication, (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) res.status(500).send({ err });
    res.send({ user });
  }).populate('avatar');
});

app.post('/user/updateRecipeUser', checkAuthentication, (req, res) => {
  const { type, idRecipe } = req.body;

  User.findById(req.user.id, (err, user) => {
    if (err) res.status(500).send({ err });

    if (type === 'FAVORITES') {
      user.favorites.push(idRecipe);
    } else if (type === 'RECIPESDONE') {
      user.recipesDone.push(idRecipe);
    } else {
      console.log('Type request recipe - not defined / not exist');
      return;
    }

    user.save();
  });
});

app.post('/user/updateUser', checkAuthentication, (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) res.status(500).send({ err });

    for (const key in req.body) {
      user[key] = req.body[key];
    }

    user.save();
  });
});

app.get('/user/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.get('/user/checkUserAuthentication', (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  res.status(200).send({ isAuthenticated });
});

app.post('/user/signup', (req, res) => {
  const { username, email, password } = req.body;

  User.register(new User({ username, email }), password, (err, user) => {
    if (err) return res.status(500).send({ err });

    passport.authenticate('local')(req, res, () => {
      req.session.save(err => {
        if (err) return res.status(500).send({ err });
        res.redirect('/');
      });
    });
  });
});

app.post('/user/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(401).send({ message: 'User or password is incorrect' });

    req.login(user, err => {
      if (err) return res.status(500).send({ err });

      return res.send({ success: true, message: 'authentication succeeded' });
    });
  })(req, res, next);
});

// Execute at the end
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Serveur running on ${port}`);
});
