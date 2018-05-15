import React from 'react'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/User/action';
import { connect } from 'react-redux';
import validateForm from '../../helpers/validateForm';
import FormLogin from './FormLogin';

const mapDispatchToProps = dispatch => {
    return {
        login: e => dispatch(login(e))
    };
};

const Connection = connect(null, mapDispatchToProps)(FormLogin);

const FormLoginReduxForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(Connection)

export default FormLoginReduxForm