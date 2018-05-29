import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes }) => {
  return (
    <ul className="recipes">
      {recipes.map((recipe, i) => (
        <li key={i}>
          <div className="entete">
            <div>
              <Link to={`/recipe/${recipe.label}`}>
                <img className="imgRecipe" src={recipe.image.path} alt={recipe.label} />
              </Link>
            </div>
            <div>
              <p className="title">{recipe.label}</p>
            </div>
          </div>
          <div className="addRecipe">
            <button className="fav" onClick={() => updateRecipeUser('FAVORITES', recipe._id)}>
              Add to my favorite
            </button>
            <button className="done" onClick={() => updateRecipeUser('RECIPESDONE', recipe._id)}>
              Add to my recipe done
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const updateRecipeUser = (type, idRecipe) => {
  axios
    .post('/user/updateRecipeUser', {
      type,
      idRecipe
    })
    .catch(err => {
      console.log(err);
    });
};

export default Recipes;
