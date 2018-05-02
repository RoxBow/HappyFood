import '../../styles/_header.scss';
import React, { Component } from 'react';

const Header = ({ signUp, showPopin }) => (
  <header>
    <h1>Enjoy cooking</h1>
    <ul>
      <li className="login">Login</li>
      <li className="register" onClick={() => showPopin('SIGNUP')}>
        Register
      </li>
    </ul>
  </header>
);

export default Header;
