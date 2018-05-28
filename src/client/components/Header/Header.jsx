import '../../styles/_header.scss';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LOGIN, SIGN_UP } from '../../constants';

const Header = ({ isAuthenticated, signUp, showPopin, logout }) => (
  <header className="main-header">
    <div className="top-bar">
      <h1>
        <NavLink to="/">
          Happy <span>Food</span>
        </NavLink>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="is-active" to="/recipe/allRecipes">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="is-active" to="/about">
              About
            </NavLink>
          </li>

          {!isAuthenticated ? (
            <li>
              <button onClick={() => showPopin(LOGIN)}>Login</button>
              <button onClick={() => showPopin(SIGN_UP)}>Sign up</button>
            </li>
          ) : (
            <li>
              <NavLink to="/user/me">My account</NavLink>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
    <div className="header-content">
      <h2>I want to make</h2>
      <p>Many options</p>
      <ul>
        <li>
          <Link to="/randomRecipes">Random Recipes</Link>
        </li>
        <li>
          <Link to="/searchWithIngredients">Search with ingredients</Link>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
