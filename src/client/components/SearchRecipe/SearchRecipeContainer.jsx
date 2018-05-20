import React from 'react';
import { connect } from 'react-redux';
import { updateSearch, setResultSearch, toggleFilters } from '../../redux/SearchRecipe/action';
import SearchRecipe from './SearchRecipe';

const mapStateToProps = state => ({
  textSearch: state.search.text,
  filters: {
    diet: state.search.diet,
    health: state.search.health
  },
  resultRecipes: state.search.result,
  filtersIsOpen: state.search.filtersIsOpen
});

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: text => dispatch(updateSearch(text)),
    setResultSearch: result => dispatch(setResultSearch(result)),
    toggleFilters: () => dispatch(toggleFilters())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchRecipe);
