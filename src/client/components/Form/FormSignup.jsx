import '../../styles/_form.scss';

import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from './Input';

const FormSignUp = ({ signUp, submitting }) => (
  <form onSubmit={signUp}>
    <Field name="username" type="text" component={Input} label="Username" />
    <Field name="password" type="password" component={Input} label="Password" />
    <Field name="email" type="email" component={Input} label="Email" />
    <button type="submit" disabled={submitting}>
      Submit
    </button>
  </form>
);

export default FormSignUp;
