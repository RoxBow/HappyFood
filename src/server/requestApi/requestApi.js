const axios = require('axios');
const { accountApi } = require('../dataServer');

exports.fetchRecipeNameEdamam = (nameSearch, callback) => {
  const { app_id, app_key } = accountApi;
  const url = `https://api.edamam.com/search?q=${nameSearch}&app_id=${app_id}&app_key=${app_key}`;

  axios
    .get(url)
    .then(res => {
      callback(res.data.hits);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.fetchRecipeNameMealDB = (nameSearch, callback) => {
  
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameSearch}`

  axios
    .get(url)
    .then(res => {
      callback(res.data.meals);
    })
    .catch(err => {
      console.log(err);
    });
};