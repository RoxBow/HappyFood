const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const request = require('request').defaults({ encoding: null });

const { urlMongoDB } = require('./dataServer');
const { getRecipeBySearch } = require('./requestApi');
const { convertToDataUrl } = require('./helpers/convertToDataUrl');

const port = 3001; // set port server

/* # MODELS # */
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const Image = require('./models/Image');

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

app.get('/fetchFilters', (req, res, next) => {
  /* SAVE REQUEST IN OUR BDD */
  // fetchRecipeName('salad', listResult => {
  //   listResult.forEach(result => {
  //     let recipe = new Recipe();
  //     let thumbRecipe = new Image();

  //     recipe.label = result.recipe.label;
  //     recipe.description = '';
  //     recipe.steps = result.recipe.ingredientLines;
  //     // recipe.ingredients = result.recipe.ingredients;
  //     recipe.diets = result.recipe.dietLabels;
  //     recipe.health = result.recipe.healthLabels;
  //     recipe.calories = result.recipe.calories;

  //     convertToDataUrl(result.recipe.image, (dataImage, contentType) => {
  //       thumbRecipe.data = dataImage;
  //       thumbRecipe.contentType = contentType;
  //       recipe.image = thumbRecipe;

  //       // save img of recipe
  //       thumbRecipe.save();

  //       recipe.save(err => {
  //         if (err) console.log(err);
  //         else console.log('All recipes saved in BDD');
  //       });
  //     });
  //   });
  // });

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

app.get('/api/searchRecipes', (req, res) => {
  let { recipeName, diets, health } = req.query;

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

app.post('/api/searchRecipesByIngredients', (req, res) => {
  const { ingredients } = req.body;

  Recipe.find(
    {
      ingredients: { $in: filters.ingredients }
    },
    (err, recipe) => {
      res.send(recipe);
    }
  );
});

app.post('/api/randomRecipe', (req, res) => {
  // Get the count of all recipes
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
});

app.post('/login', (req, res) => {
  const { username, pwd } = req.body;

  const query = User.findOne({ username: username, password: pwd });

  //select username & password field
  query.select('username password');

  // execute the query at a later time
  query.exec((err, user) => {
    if (user) {
      res.send(user.id);
    } else {
      res.send({ message: 'Error user login' });
    }
  });
});

// Execute at the end
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Serveur running on ${port}`);
});
