import React from 'react';
import base64ArrayBuffer from '../../helpers/base64ArrayBuffer';

const Recipes = ({ recipes }) => {
  return (
    <ul className="recipes">
      {recipes.map((recipe, i) => (
        <li key={i}>
          <img src={base64ArrayBuffer(recipe.image.data.data, recipe.image.contentType)} alt="" />
          <p>{recipe.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default Recipes;
