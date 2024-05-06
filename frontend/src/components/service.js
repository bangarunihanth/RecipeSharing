import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'; // Import microphone icon
import './Recipe.css'; // Importing CSS file for styling

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('id'); // Default sorting option
  const [filterBy, setFilterBy] = useState('All'); // Default filter option
  const [searchQuery, setSearchQuery] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API
  const fetchRecipes = () => {
    fetch('http://localhost:4000/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipe data:', error));
  };

  // Handle sorting change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort recipes based on selected sorting option
  const sortRecipes = (recipes) => {
    switch (sortBy) {
      case 'id':
        return recipes.sort((a, b) => a.id.localeCompare(b.id));
      case 'timetaken':
        return recipes.sort((a, b) => a.timetaken - b.timetaken);
      default:
        return recipes;
    }
  };

  // Filter recipes based on selected cuisine
  const filterRecipes = (recipes) => {
    if (filterBy === 'All') {
      return recipes;
    } else {
      return recipes.filter(recipe => recipe.cuisine.toLowerCase() === filterBy.toLowerCase());
    }
  };

  // Function to handle saving a recipe
  const handleSaveRecipe = (recipeId) => {
    const savedRecipe = recipes.find(recipe => recipe.id === recipeId);
    if (savedRecipe) {
      setSavedRecipes(prevSavedRecipes => [...prevSavedRecipes, savedRecipe]);
    }
  };

  // Function to handle speech recognition
  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <div className="recipe-container">
      <div className="dropdown-container">
        <div className="dropdown">
          <label htmlFor="filter">Filter By Cuisine:</label>
          <select id="filter" value={filterBy} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="South-Indian">South Indian</option>
            <option value="North-Indian">North Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Turkish">Turkish</option>
            <option value="Japanese">Japanese</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="id">Recently added</option>
            <option value="timetaken">Speedy</option>
          </select>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search recipes..."
            className="search-bar"
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{ backgroundColor: '#716969' }} // Set background color
          />
          <button onClick={handleSpeechRecognition} className="speech-button">
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      </div>
      <div className="card-container">
        {sortRecipes(filterRecipes(filteredRecipes)).map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <div className="recipe-info">
                <h2>{recipe.name}</h2>
                <p>Cuisine: {recipe.cuisine}</p>
                <p>Rating: {recipe.rating}</p>
              </div>
            </Link>
            <button className="save-button" onClick={() => handleSaveRecipe(recipe.id)}>
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipe;
