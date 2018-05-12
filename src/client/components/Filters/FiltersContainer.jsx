import React from 'react';
import { connect } from 'react-redux';
import { toggleFilter } from '../../redux/SearchRecipe/action';
import Filters from './Filters';

const mapDispatchToProps = dispatch => {
  return {
    toggleFilter: (type, name, isActive) => dispatch(toggleFilter(type, name, isActive))
  };
};


export default connect(null, mapDispatchToProps)(Filters);
