import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css'; // Import CSS file for styling

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedInstructions, setSelectedInstructions] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0); // New state for user rating
    const handleRatingChange = (event) => {
        setUserRating(parseInt(event.target.value));
    };
    

    useEffect(() => {
        fetch(`http://localhost:4000/recipes/${id}`)
            .then(response => response.json())
            .then(data => setRecipe(data))
            .catch(error => console.error('Error fetching recipe details:', error));
    }, [id]);

    const toggleIngredient = (index) => {
        const selectedIndex = selectedIngredients.indexOf(index);
        if (selectedIndex === -1) {
            setSelectedIngredients([...selectedIngredients, index]);
        } else {
            const newSelectedIngredients = [...selectedIngredients];
            newSelectedIngredients.splice(selectedIndex, 1);
            setSelectedIngredients(newSelectedIngredients);
        }
    };

    const toggleInstruction = (index) => {
        const selectedIndex = selectedInstructions.indexOf(index);
        if (selectedIndex === -1) {
            setSelectedInstructions([...selectedInstructions, index]);
        } else {
            const newSelectedInstructions = [...selectedInstructions];
            newSelectedInstructions.splice(selectedIndex, 1);
            setSelectedInstructions(newSelectedInstructions);
        }
    };

    const toggleEquipment = (index) => {
        const selectedIndex = selectedEquipment.indexOf(index);
        if (selectedIndex === -1) {
            setSelectedEquipment([...selectedEquipment, index]);
        } else {
            const newSelectedEquipment = [...selectedEquipment];
            newSelectedEquipment.splice(selectedIndex, 1);
            setSelectedEquipment(newSelectedEquipment);
        }
    };

    // Function to generate star rating
    const generateStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} className="star filled" onClick={() => setUserRating(i)}>&#9733;</span>);
            } else {
                stars.push(<span key={i} className="star" onClick={() => setUserRating(i)}>&#9734;</span>);
            }
        }
        return stars;
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        // Submit rating and comment
        console.log('Rating:', userRating);
        console.log('Comment:', comment);
        // You can send the rating and comment data to your backend or perform other actions here
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-details">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h2>{recipe.name}</h2>
            <p>Cuisine: {recipe.cuisine}</p>
            <p>Rating: {generateStars(recipe.rating)}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <h3>Ingredients:</h3>
            <div className="ingredient-section">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <div
                        key={index}
                        className={`ingredient-item ${selectedIngredients.includes(index) ? 'selected' : ''}`}
                        onClick={() => toggleIngredient(index)}
                    >
                        {ingredient}
                    </div>
                ))}
            </div>
            <h3>Equipment:</h3>
            <div className="ingredient-section">
                {recipe.equipment && recipe.equipment.map((equipment, index) => (
                    <div
                        key={index}
                        className={`ingredient-item ${selectedEquipment.includes(index) ? 'selected' : ''}`}
                        onClick={() => toggleEquipment(index)}
                    >
                        {equipment}
                    </div>
                ))}
            </div>
            <h3>Nutritional Information:</h3>
            <ul>
                {recipe.nutritionalInfo && recipe.nutritionalInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                ))}
            </ul>
            <h3>Tips:</h3>
            <ul className="left-align">
                {recipe.tips && recipe.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <div className="instruction-cards">
                {recipe.instructions && recipe.instructions.map((instruction, index) => (
                    <div
                        key={index}
                        className={`instruction-card ${selectedInstructions.includes(index) ? 'selected' : ''}`}
                        onClick={() => toggleInstruction(index)}
                    >
                        <div className="step-number">Step {index + 1}</div>
                        <p>{instruction}</p>
                    </div>
                ))}
            </div>
            <div className="rating-comment-section">
                <h3>Your Rating:</h3>
                <p>{generateStars(userRating)}</p>
                <h3>Post a comment:</h3>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    rows="4"
                    cols="50"
                    placeholder="Write your comment here..."
                ></textarea>
                <button className='primary-button' onClick={handleSubmit}>Post Comment</button>
            </div>
        </div>
    );
}

export default RecipeDetails;

