import React, { Component } from 'react';

const Recipes = ({ recipes }) => {
  return <ul className="recipes">{recipes.map((recipe, i) => <li key={i}>{recipe.label}</li>)}</ul>;
};

export default Recipes;
