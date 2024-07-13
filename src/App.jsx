import React, { useState } from 'react';
import './App.css';
import { getDishSuggestions } from './geminiService';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleCook = async () => {
    setLoading(true);
    try {
      const suggestedDishes = await getDishSuggestions(ingredients);
      setDishes(suggestedDishes);
    } catch (error) {
      console.error('Error getting dish suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDishClick = (dish) => {
    alert(`You clicked on ${dish}. Here you could show more details about the dish or link to a recipe.`);
  };

  return (
    <div className="App">
      <div className="background-text">yum!</div>
      <h1>Recipify</h1>
      <header className="App-header">
        <h2 style={{ marginBottom: '10px' }}>Enter the raw material that you have</h2>
        <input
          type="text"
          value={ingredients}
          onChange={handleInputChange}
          placeholder="Enter ingredients"
        />
        <button onClick={handleCook} disabled={loading}>
          {loading ? 'Cooking...' : 'Cook'}
        </button>
        {dishes.length > 0 && (
          <div className="dishes">
            <h2 style={{ zIndex: '1' }}>Suggested Dishes:</h2>
            <ul>
              {dishes.map((dish, index) => (
                <li key={index}>
                  <button className="dish-button" onClick={() => handleDishClick(dish)}>
                    {dish}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <footer className="App-footer">
        Built with love ❤️ by Tridib and Shruti!
      </footer>
    </div>
  );
}

export default App;