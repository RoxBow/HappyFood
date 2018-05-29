const Image = require('../models/Image');
const Recipe = require('../models/Recipe');
const { fetchRecipeNameEdamam } = require('./requestApi');
const { downloadImage } = require('../helpers/downloadImage');

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

const saveRecipeEdamam = fetchRecipeNameEdamam('chicken', listResult => {
  listResult.forEach(result => {
    let recipe = new Recipe();

    recipe.label = result.recipe.label;
    recipe.description = '';
    recipe.steps = result.recipe.ingredientLines;
    recipe.ingredients = result.recipe.ingredientLines;
    recipe.diets = result.recipe.dietLabels;
    recipe.health = result.recipe.healthLabels;
    recipe.calories = result.recipe.calories;
    recipe.source = result.recipe.url;

    downloadImage(result.recipe.image, recipe._id, (filename, completePath, lengthFile, typeFile) => {
      const imageRecipe = new Image ({
        name: filename,
        path: completePath,
        length: lengthFile,
        type: typeFile
      });

      recipe.image = imageRecipe;
      
      recipe.save(err => {
        if (err) console.log(err);
        else {
          imageRecipe.save();
          console.log('All recipes saved in BDD from Edamam');
        } 
      });
    });

  });
});

exports.saveRecipeEdamam;
