import React, { Component } from 'react';

const Input = ({ input, label, type, meta: { submitting, error, warning } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} />
    {submitting && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export default Input;
