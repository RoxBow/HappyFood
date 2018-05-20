import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchRecipe from '../SearchRecipe/SearchRecipeContainer';
import RandomRecipe from '../RandomRecipe/RandomRecipe';

const Home = () => (
  <main>
    <Route path="/searchRecipes" component={SearchRecipe} />
    <Route path="/randomRecipes" component={RandomRecipe} />
  </main>
);

export default Home;
