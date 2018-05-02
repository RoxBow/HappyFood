import React from 'react';

const validateForm = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 10) {
    errors.username = 'Must be 10 characters or less';
  } else if (values.username.length < 2) {
    errors.username = 'Must be 3 characters or more';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default validateForm;
