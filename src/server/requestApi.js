const axios = require('axios');
const { accountApi } = require('./dataServer');

exports.getRecipeBySearch = (nameSearch, callback) => {
  let url;
  const { app_id, app_key } = accountApi;

  url = `https://api.edamam.com/search?q=${nameSearch}&app_id=${app_id}&app_key=${app_key}`;

  axios
    .get(url)
    .then(res => {
      callback(res.data.hits);
    })
    .catch(err => {
      console.log(err);
    });
};
