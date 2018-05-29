import React from 'react';
import { connect } from 'react-redux';
import { showPopin } from '../../redux/Popin/action';
import { logout } from '../../redux/User/action';
import Header from './Header';

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = dispatch => {
  return {
    showPopin: (type) => dispatch(showPopin(type)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
