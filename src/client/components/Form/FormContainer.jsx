import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../../redux/User/action';
import validateForm from '../../helpers/validateForm';
import FormSignUp from './FormSignup';

const mapDispatchToProps = dispatch => {
  return {
    signUp: e => dispatch(signUp(e))
  };
};

const Form = connect(null, mapDispatchToProps)(FormSignUp);

export default reduxForm({
  form: 'signUp',
  validateForm
})(Form);
