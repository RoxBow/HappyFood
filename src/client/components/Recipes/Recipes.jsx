import React from 'react';

const Recipes = ({ recipes }) => {
  return (
    <ul className="recipes">
      {recipes.map((recipe, i) => (
        <li key={i}>
          <img src={recipe.image.path} alt={recipe.label} />
          <p>{recipe.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default Recipes;
