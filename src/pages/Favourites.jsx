import React, { useState, useEffect } from 'react';

const Favourites = () => {
  // Initialize favourites from localStorage once.
  const [favourites, setFavourites] = useState(() => {
    const storedFavs = localStorage.getItem('favourites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // Save favourites to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Remove a recipe from favourites.
  const handleRemoveFavorite = (id) => {
    setFavourites(favourites.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="favourites">
      <h1>Favourites</h1>
      {favourites.length > 0 ? (
        <ul className="recipe-list">
          {favourites.map(recipe => (
            <li key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <div className="recipe-actions">
                <button className="remove-btn" onClick={() => handleRemoveFavorite(recipe.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favourites added yet.</p>
      )}
    </div>
  );
};

export default Favourites;
