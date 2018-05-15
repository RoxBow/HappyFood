import React from 'react';
import { connect } from 'react-redux';
import Recipes from './Recipes';

const mapStateToProps = state => ({
  recipes: state.search.result,
});

export default connect(mapStateToProps, null)(Recipes);
