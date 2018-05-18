import React, { Component } from 'react';
import Filters from '../Filters/FiltersContainer';
import { setResultSearch } from '../../redux/SearchRecipe/action';
import axios from 'axios';

const SearchRecipe = ({ textSearch, filters, updateSearch, toggleFilter, setResultSearch }) => (
  <div className="searchRecipe">
    <form onSubmit={e => submitSearch(e, textSearch, filters, setResultSearch)}>
      <label htmlFor="search">Search</label>
      <input type="text" id="search" onChange={e => updateSearch(e.target.value)} />
      <Filters />
      <input type="submit" value="submit" />
    </form>
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
