import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import SearchRecipe from '../SearchRecipe/SearchRecipeContainer';
import RandomRecipe from '../RandomRecipe/RandomRecipe';
import SearchWithIngredient from '../SearchWithIngredient/SearchWithIngredientContainer';
import RecipeInformation from '../RecipeInformation/RecipeInformation';
import PrivateRoute from '../PrivateRoute/PrivateRouteContainer';
import UserProfile from '../UserProfile/UserProfile';
import { connect } from 'react-redux';

const Home = ({ isLoading }) => (
  <main>
    <Route path="/searchRecipes" component={SearchRecipe} />
    <Route path="/randomRecipes" component={RandomRecipe} />
    <Route path="/searchWithIngredients" component={SearchWithIngredient} />
    <Route path="/recipe/:nameRecipe" component={RecipeInformation} />

    {!isLoading && (
      <Switch>
        <PrivateRoute path="/user/me" exact component={UserProfile} />
      </Switch>
    )}
  </main>
);

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

export default withRouter(connect(mapStateToProps)(Home));
