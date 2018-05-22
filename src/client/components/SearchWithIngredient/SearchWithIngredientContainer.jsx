import React from 'react';
import { connect } from 'react-redux';
import { updateSearch, setResultSearch } from '../../redux/SearchRecipe/action';
import SearchWithIngredient from './SearchWithIngredient';

const mapStateToProps = state => ({
  textSearch: state.search.text,
  resultRecipes: state.search.result
});

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: text => dispatch(updateSearch(text)),
    setResultSearch: result => dispatch(setResultSearch(result))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithIngredient);
