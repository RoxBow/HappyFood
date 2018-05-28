import React from 'react';
import { connect } from 'react-redux';
import { updateSearch } from '../../redux/SearchRecipe/action';
import SearchWithIngredient from './SearchWithIngredient';

const mapStateToProps = state => ({
  textSearch: state.search.text,
});

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: text => dispatch(updateSearch(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithIngredient);
