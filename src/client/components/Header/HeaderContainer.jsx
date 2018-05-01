import React from 'react';
import { connect } from 'react-redux';
import { showPopin } from '../../redux/Popin/action';
import Header from './Header';

const mapDispatchToProps = dispatch => {
  return {
    showPopin: () => {
      dispatch(showPopin());
    }
  };
};

export default connect(null, mapDispatchToProps)(Header);
