import React, { useState, useEffect } from 'react';

const defaultRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    ingredients: 'Pasta, Eggs, Cheese, Bacon',
    instructions: 'Cook pasta, mix with eggs, cheese, and bacon',
    image: 'https://sourhttps://lisasdinnertimedish.com/wp-content/uploads/2016/01/3151e.jpg-3151.jpgce.unsplash.com/random/800x600/?spaghetti,carbonara'
  },
  {
    id: 2,
    title: 'Chicken Curry',
    ingredients: 'Chicken, Curry powder, Coconut milk',
    instructions: 'Cook chicken with curry powder and coconut milk',
    image: 'https://source.unsplash.com/random/800x600/?chicken,curry'
  },
  {
    id: 3,
    title: 'Margherita Pizza',
    ingredients: 'Dough, Tomato, Mozzarella, Basil',
    instructions: 'Bake dough topped with tomato, mozzarella, and basil',
    image: 'https://source.unsplash.com/random/800x600/?pizza,margherita'
  },
];

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  // Lazy initialization: favorites state is set based on localStorage when the component mounts.
  const [favourites, setFavourites] = useState(() => {
    const storedFavs = localStorage.getItem('favourites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  // Load recipes once on mount.
  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    let recipesData = storedRecipes ? JSON.parse(storedRecipes) : [];
    if (recipesData.length === 0) {
      recipesData = [...defaultRecipes];
      localStorage.setItem('recipes', JSON.stringify(recipesData));
    }
    // Sort descending so new recipes appear first.
    recipesData.sort((a, b) => b.id - a.id);
    setRecipes(recipesData);
  }, []);

  // Save favourites to localStorage whenever favourites change.
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const handleToggleFavourite = (recipe) => {
    if (favourites.some(fav => fav.id === recipe.id)) {
      setFavourites(favourites.filter(fav => fav.id !== recipe.id));
    } else {
      setFavourites([...favourites, recipe]);
    }
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    // Remove from favourites as well.
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  return (
    <div className="home">
      <h1 className="site-title">Recipe Sharing Platform</h1>
      <div className="all-recipes">
        <h2>All Recipes</h2>
        <ul className="recipe-list">
          {recipes.map(recipe => (
            <li key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <div className="recipe-actions">
                <button onClick={() => handleToggleFavourite(recipe)}>
                  {favourites.some(fav => fav.id === recipe.id) ? 'Unlike' : 'Like'}
                </button>
                <button onClick={() => handleDeleteRecipe(recipe.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
