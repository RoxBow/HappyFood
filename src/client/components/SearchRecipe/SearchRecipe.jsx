import React, { Component } from 'react';
import Filters from '../Filters/FiltersContainer';
import axios from 'axios';

const SearchRecipe = ({ textSearch, filters, updateSearch, toggleFilter }) => (
  <div className="searchRecipe">
    <form onSubmit={e => submitSearch(e, textSearch, filters)}>
      <label htmlFor="search">Search</label>
      <input type="text" id="search" onChange={e => updateSearch(e.target.value)} />
      <Filters />
      <input type="submit" value="submit" />
    </form>
  </div>
);

const submitSearch = (e, textSearch, filters = {}) => {
  e.preventDefault();

  axios
    .post('/searchRecipes', {
        textSearch,
        filters
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export default SearchRecipe;
