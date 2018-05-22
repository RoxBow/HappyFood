import '../../styles/_searchRecipe.scss';
import React from 'react';
import axios from 'axios';
import { setResultSearch } from '../../redux/SearchRecipe/action';
import Recipes from '../Recipes/Recipes';

const SearchWithIngredient = ({
  textSearch,
  filters,
  resultRecipes,
  updateSearch,
  setResultSearch
}) => (
  <div className="search-recipe">
    <form onSubmit={e => submitSearch(e, textSearch, setResultSearch)}>
      <div className="wrapper-search-bar">
        <input
          type="text"
          className="input-search"
          id="form-search-recipe"
          placeholder="Search recipes"
          onChange={e => updateSearch(e.target.value)}
        />
        <input type="submit" value="Search" />
      </div>
    </form>
    {resultRecipes && <Recipes recipes={resultRecipes} />}
  </div>
);

const submitSearch = (e, textSearch, setResultSearch) => {
  e.preventDefault();

  const ingredients = textSearch.split(" ");

  axios
    .get('/api/searchRecipesByIngredients', {
      params: {
        ingredients
      }
    })
    .then(res => {
      const listRecipes = res.data;
      setResultSearch(listRecipes);
    })
    .catch(err => {
      console.log(err);
    });
};

export default SearchWithIngredient;
