import '../../styles/_recipeInformation.scss';
import React from 'react';
import axios from 'axios';

class RecipeInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { nameRecipe } = this.props.match.params;
    const _this = this;

    axios
      .get('/getInformationRecipe', {
        params: {
          nameRecipe
        }
      })
      .then(res => {
        _this.setState(res.data.recipe);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderList(title, list) {
    return (
      <div className="elements">
        <h3>{title}</h3>
        <ul>{list.map((element, i) => <li key={i}>- {element}</li>)}</ul>
      </div>
    );
  }

  render() {
    const { label, description, ingredients, steps, image, diets, health } = this.state;

    return (
      <div className="recipe-information">
        <h2 className="title">{label}</h2>
        <div className="img-ingredients">
          <div className="img-box">
            {image && <img src={`../${image.path}`} alt={label} />}
          </div>
          <p className="description">
            Résumé:<br /> {description}
          </p>
        </div>
        <div className="img-ingredients">
          {ingredients && this.renderList('Ingredients', ingredients)}
          {steps && this.renderList('Steps', steps)}
          {diets && this.renderList('Diets', diets)}
          {health && this.renderList('Health', health)}
        </div>
        
        
        
      </div>
    );
  }
}

export default RecipeInformation;
