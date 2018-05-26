import '../../styles/_header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN, SIGN_UP } from '../../constants';

const Header = ({ signUp, showPopin }) => (
  <header>
    <h1>HappyFood</h1>
    <ul className="account-option">
      <li className="login" onClick={() => showPopin(LOGIN)}>
        Login
      </li>
      <li className="register" onClick={() => showPopin(SIGN_UP)}>
        Register
      </li>
    </ul>
    <ul className="search-option">
      <li>
        <Link to="/searchRecipes">Search Recipes</Link>
      </li>
      <li>
        <Link to="/randomRecipes">Random Recipes</Link>
      </li>
      <li>
        <Link to="/searchWithIngredients">Search with ingredients</Link>
      </li>
    </ul>
  </header>
);

export default Header;
