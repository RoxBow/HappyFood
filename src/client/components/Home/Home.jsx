import React, { Component } from 'react';
import SearchRecipe from '../SearchRecipe/SearchRecipeContainer';
import Recipes from '../Recipes/RecipesContainer';

const Home = () => (
  <main>
    <SearchRecipe />
    <Recipes />
  </main>
);

export default Home;
