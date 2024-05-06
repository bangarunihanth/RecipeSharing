// RecipeItem.js
import React from 'react';

function RecipeItem({ recipe }) {
  return (
    <div className="recipe-item">
      <h3>{recipe.title}</h3>
      <p>Posted by: {recipe.author}</p>
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeItem;
