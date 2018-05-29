import '../../styles/_searchRecipe.scss';
import React from 'react';
import axios from 'axios';
import Recipes from '../Recipes/Recipes';

class SearchWithIngredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const _this = this;
    const { textSearch } = this.props;
    const ingredients = textSearch.split(' ');

    axios
      .get('/api/searchRecipesByIngredients', {
        params: {
          ingredients
        }
      })
      .then(res => {
        const listRecipes = res.data;
        console.log(listRecipes)
        _this.setState({ resultRecipes: listRecipes });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { resultRecipes } = this.state;
    const { updateSearch } = this.props;

    return (
      <div className="search-recipe">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="wrapper-search-bar">
            <input
              type="text"
              className="input-search"
              id="form-search-recipe"
              placeholder="Search recipes"
              onChange={e => updateSearch(e.target.value)}
            />
            <input type="submit" value="Search" />
          </div>
        </form>
        {resultRecipes && <Recipes recipes={resultRecipes} />}
      </div>
    );
  }
}

export default SearchWithIngredient;
