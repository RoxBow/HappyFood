const Image = require('../models/Image');
const Recipe = require('../models/Recipe');
const { fetchRecipeNameMealDB } = require('./requestApi');
const { downloadImage } = require('../helpers/downloadImage');

const maxIngredients = 20; // fix 20 by API

const saveRecipeMealDB = fetchRecipeNameMealDB('chicken', listResult => {
  for (const key in listResult) {
    const result = listResult[key];

    let recipe = new Recipe();

    recipe.label = result.strMeal;
    recipe.description = result.strInstructions;
    recipe.category = result.strCategory;
    recipe.source = result.strSource;

    for (let i = 1; i < maxIngredients; i++) {
      // check if ingredient has content (api return empty string)
      if (result[`strIngredient${i}`]) {
        recipe.ingredients.push(result[`strIngredient${i}`]);
        recipe.steps.push(result[`strMeasure${i}`] + ' ' + result[`strIngredient${i}`]);
      }
    }
    
    downloadImage(result.strMealThumb, recipe._id, (filename, completePath, lengthFile, typeFile) => {
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
          console.log('All recipes saved in BDD from MealDB');
        }
      });
    });

  }
});

exports.saveRecipeMealDB;
