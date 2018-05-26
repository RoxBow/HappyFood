import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchRecipe from '../SearchRecipe/SearchRecipeContainer';
import RandomRecipe from '../RandomRecipe/RandomRecipe';
import SearchWithIngredient from '../SearchWithIngredient/SearchWithIngredientContainer';
import RecipeInformation from '../RecipeInformation/RecipeInformation';

const Home = () => (
  <main>
    <Route path="/searchRecipes" component={SearchRecipe} />
    <Route path="/randomRecipes" component={RandomRecipe} />
    <Route path="/searchWithIngredients" component={SearchWithIngredient} />
    <Route path="/recipe/:nameRecipe" component={RecipeInformation}/>
  </main>
);

export default Home;
