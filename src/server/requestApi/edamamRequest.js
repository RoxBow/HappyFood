const Recipe = require('../models/Recipe');
const Image = require('../models/Image');
const { fetchRecipeNameEdamam } = require('./requestApi');
const { convertToDataUrl } = require('../helpers/convertToDataUrl');

/**
 * Our model -> api's model
 * label -> label
 * description -> none
 * steps -> ingredientLines
 * ingredients -> ingredients
 * diets -> dietLabels
 * health -> healthLabels
 * calories -> calories
 * note -> none
 * source -> url
 * image -> image
 */

const saveRecipeEdamam = fetchRecipeNameEdamam('salad', listResult => {
  listResult.forEach(result => {
    let recipe = new Recipe();
    let thumbRecipe = new Image();

    recipe.label = result.recipe.label;
    recipe.description = '';
    recipe.steps = result.recipe.ingredientLines;
    recipe.ingredients = result.recipe.ingredientLines
    recipe.diets = result.recipe.dietLabels;
    recipe.health = result.recipe.healthLabels;
    recipe.calories = result.recipe.calories;
    recipe.source = result.recipe.url;

    convertToDataUrl(result.recipe.image, (dataImage, contentType) => {
      thumbRecipe.data = dataImage;
      thumbRecipe.contentType = contentType;
      recipe.image = thumbRecipe;

      // save img of recipe
      thumbRecipe.save();

      recipe.save(err => {
        if (err) console.log(err);
        else console.log('All recipes saved in BDD from Edamam');
      });
    });
  });
});

exports.saveRecipeEdamam;
