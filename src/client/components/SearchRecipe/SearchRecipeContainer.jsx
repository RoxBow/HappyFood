import React from 'react';
import { connect } from 'react-redux';
import { updateSearch } from '../../redux/SearchRecipe/action';
import SearchRecipe from './SearchRecipe';

const mapStateToProps = state => ({
  textSearch: state.search,
  filters: state.search
});

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: text => dispatch(updateSearch(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchRecipe);
