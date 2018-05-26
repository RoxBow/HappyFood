import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes }) => {
  return (
    <ul className="recipes">
      {recipes.map((recipe, i) => (
        <li key={i}>
          <Link to={`/recipe/${recipe.label}`}>
            <img src={recipe.image.path} alt={recipe.label} />
          </Link>
          <button onClick={() => updateRecipeUser('FAVORITES', recipe._id)}>
            Add to my favorite
          </button>
          <button onClick={() => updateRecipeUser('RECIPESDONE', recipe._id)}>
            Add to my recipe done
          </button>
          <p>{recipe.label}</p>
        </li>
      ))}
    </ul>
  );
};

const updateRecipeUser = (type, idRecipe) => {
  axios
    .post('/updateRecipeUser', {
      type,
      idRecipe
    })
    .catch(err => {
      console.log(err);
    });
};

export default Recipes;
