import React from 'react';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
