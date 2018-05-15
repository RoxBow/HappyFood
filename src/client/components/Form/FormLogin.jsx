import '../../styles/_form.scss';

import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from './Input';

const FormLogin = ({ login, submitting }) => (
  <form onSubmit={login}>
    <Field name="username" type="text" component={Input} label="Username" />
    <Field name="password" type="password" component={Input} label="Password" />
    <button type="submit" disabled={submitting}>
      Connecter
    </button>
  </form>
);

export default FormLogin;