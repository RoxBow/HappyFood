import React, { Component } from 'react';

const Input = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="input">
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export default Input;
