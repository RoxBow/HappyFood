import '../../styles/_header.scss';
import React, { Component } from 'react';

const Header = ({ showPopin }) =>
  <header>
    <h1>Enjoy cooking</h1>
    <ul>
      <li className="login" onClick={showPopin}>
        Login
      </li>
      <li className="register">Register</li>
    </ul>
  </header>;

export default Header;
