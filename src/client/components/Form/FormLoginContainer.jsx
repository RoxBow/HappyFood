import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../redux/User/action';
import { hidePopin } from '../../redux/Popin/action';
import FormLogin from './FormLogin';

const mapDispatchToProps = dispatch => {
  return {
    login: e => {
      dispatch(login(e));
      dispatch(hidePopin());
    }
  };
};

const FormLoginConnect = connect(null, mapDispatchToProps)(FormLogin);

export default reduxForm({
  form: 'login'
})(FormLoginConnect);
