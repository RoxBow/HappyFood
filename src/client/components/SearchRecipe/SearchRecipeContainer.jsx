import React from 'react';
import { connect } from 'react-redux';
import { updateSearch, setResultSearch } from '../../redux/SearchRecipe/action';
import SearchRecipe from './SearchRecipe';

const mapStateToProps = state => ({
  textSearch: state.search.text,
  filters: {
    diet: state.search.diet,
    allergie: state.search.allergie
  }
});

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: text => dispatch(updateSearch(text)),
    setResultSearch: result => dispatch(setResultSearch(result))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchRecipe);
