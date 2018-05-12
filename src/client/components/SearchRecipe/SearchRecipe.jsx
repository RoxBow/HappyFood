import React, { Component } from 'react';
import Filters from '../Filters/FiltersContainer';

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

const submitSearch = (e, textSearch, filters) => {
  e.preventDefault();

  console.log('TEXT SEARCH: ', textSearch);
  console.log('Filters active: ', filters);
};

export default SearchRecipe;
