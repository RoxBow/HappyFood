const Recipe = require('../models/Recipe');
const Image = require('../models/Image');
const { fetchRecipeNameMealDB } = require('./requestApi');
const { convertToDataUrl } = require('../helpers/convertToDataUrl');

const maxIngredients = 20; // fix 20 by API

const saveRecipeMealDB = fetchRecipeNameMealDB('chicken', listResult => {
  
  for (const key in listResult) {
    const result = listResult[key];
    
    let recipe = new Recipe();
    let thumbRecipe = new Image();

    recipe.label = result.strMeal;
    recipe.description = result.strInstructions;
    recipe.category = result.strCategory;
    recipe.source = result.strSource;

    for (let i = 1; i < maxIngredients; i++) {
      if(result[`strIngredient${i}`]){
        recipe.ingredients.push(result[`strIngredient${i}`]);
        recipe.steps.push(result[`strMeasure${i}`] + ' ' + result[`strIngredient${i}`]);
      }
    }

    convertToDataUrl(result.strMealThumb, (dataImage, contentType) => {
      thumbRecipe.data = dataImage;
      thumbRecipe.contentType = contentType;
      recipe.image = thumbRecipe;

      // save img of recipe
      thumbRecipe.save();

      recipe.save(err => {
        if (err) console.log(err);
        else console.log('All recipes saved in BDD from MealDB');
      });
    });
  }
});

exports.saveRecipeMealDB;
