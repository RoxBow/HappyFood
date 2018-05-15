import '../../styles/_header.scss';
import React from 'react';
import { LOGIN, SIGN_UP } from "../../constants";

const Header = ({ signUp, showPopin }) => (
  <header>
    <h1>Enjoy cooking</h1>
    <ul>
      <li className="login" onClick={() => showPopin(LOGIN)}>
          Login
      </li>
      <li className="register" onClick={() => showPopin(SIGN_UP)}>
        Register
      </li>
    </ul>
  </header>
);

export default Header;
