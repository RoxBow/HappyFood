import '../../styles/_header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN, SIGN_UP } from '../../constants';

const Header = ({ isAuthenticated, signUp, showPopin, logout }) => (
  <header>
    <h1>HappyFood</h1>
    <ul className="account-option">
      {
        isAuthenticated? (
          <li className="li-box2">
            <Link to="/user/me">Go to profile</Link><br/>
            <button onClick={logout}>Logout</button>
          </li>
        ):(
          <li className="li-box">
            <button className="login" onClick={() => showPopin(LOGIN)}>Login</button>
            <button className="register" onClick={() => showPopin(SIGN_UP)}>Register</button>
          </li>
        )
      }
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
