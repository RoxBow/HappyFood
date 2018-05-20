import '../../styles/_searchRecipe.scss';
import React from 'react';
import axios from 'axios';
import { setResultSearch } from '../../redux/SearchRecipe/action';
import Filters from '../Filters/FiltersContainer';
import Recipes from '../Recipes/Recipes';

const SearchRecipe = ({
  textSearch,
  filters,
  resultRecipes,
  filtersIsOpen,
  updateSearch,
  toggleFilter,
  toggleFilters,
  setResultSearch
}) => (
  <div className="search-recipe">
    <form onSubmit={e => submitSearch(e, textSearch, filters, setResultSearch)}>
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
      <button type="button" onClick={toggleFilters} className="more">
        + More
      </button>
      {filtersIsOpen && <Filters />}
    </form>
    {resultRecipes && <Recipes recipes={resultRecipes} />}
  </div>
);

const submitSearch = (e, textSearch, filters, setResultSearch) => {
  e.preventDefault();

  axios
    .post('/searchRecipes', {
      textSearch,
      filters
    })
    .then(res => {
      const listRecipes = res.data;
      setResultSearch(listRecipes);
    })
    .catch(err => {
      console.log(err);
    });
};

export default SearchRecipe;
