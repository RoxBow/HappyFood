import '../../styles/_searchRecipe.scss';
import React from 'react';
import axios from 'axios';
import Filters from '../Filters/FiltersContainer';
import Recipes from '../Recipes/Recipes';

class SearchRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { textSearch, filters } = this.props;

    axios
      .get('/api/searchRecipes', {
        params: {
          recipeName: textSearch,
          diets: filters.diet,
          health: filters.health
        }
      })
      .then(res => {
        const listRecipes = res.data;
        this.setState({ resultRecipes: listRecipes });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { resultRecipes } = this.state;
    const { filtersIsOpen, updateSearch, toggleFilters } = this.props;

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
          <button type="button" onClick={toggleFilters} className="more">
            + More
          </button>
          {filtersIsOpen && <Filters />}
        </form>
        {resultRecipes && <Recipes recipes={resultRecipes} />}
      </div>
    );
  }
}

export default SearchRecipe;
