import '../../styles/_form.scss';

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validateForm from '../../helpers/validateForm';
import Input from './Input';

const FormSignUp = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="username" type="text" component={Input} label="Username" />
    <Field name="password" type="password" component={Input} label="Password" />
    <Field name="email" type="email" component={Input} label="Email" />
    <button type="submit" disabled={submitting}>
      Submit
    </button>
  </form>
);

export default reduxForm({
  form: 'signUp',
  validateForm
})(FormSignUp);
