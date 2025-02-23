import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    const newRecipe = {
      id: Date.now(), // Unique ID from timestamp
      title,
      ingredients,
      instructions,
      image: image || 'https://source.unsplash.com/random/800x600'
    };
    const updatedRecipes = [...recipes, newRecipe];
    console.log('Adding new recipe:', newRecipe);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    navigate('/');
    window.location.reload(); // Force Home to reload and load the updated recipes
  };

  return (
    <div className="add-recipe">
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Ingredients (comma separated)" 
          value={ingredients} 
          onChange={(e) => setIngredients(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Instructions" 
          value={instructions} 
          onChange={(e) => setInstructions(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Image URL (optional)" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
