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

  <div>
    <button type='button' onClick={() => updateTest()}>UPDATE TEST</button>
    <button type='button' onClick={() => checkLog()}>CHECK LOG</button>
    <button type='button' onClick={() => logout()}>LOGOUT</button>
    <button type='button' onClick={() => login()}>LOGIN</button>
  </div>

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

const updateTest = () => {
  
  axios
    .post('/updateUser', {
      firstName: 'Vincent',
      lastName: 'deplais'
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

const logout = () => {
  
  axios
    .get('/logout')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

const checkLog = () => {
  
  axios
    .get('/checkAuthentication')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}


const login = () => {
  
  axios
    .get('/login')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

const submitSearch = (e, textSearch, filters, setResultSearch) => {
  e.preventDefault();

  axios
    .get('/api/searchRecipes', {
      params: {
        recipeName: textSearch,
        diets: filters.diet,
        health: filters.health,
        isNotApi: true
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

export default SearchRecipe;
