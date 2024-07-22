import React, { useState, useRef } from 'react';
import './App.css';
import { getDishSuggestions } from './geminiService';
import { fetchRecipe } from './apiService';
import Testimonials from './components/Testimonials/Testimonials';
import PopularRecipes from './components/PopularRecipes/PopularRecipes';
import Footer from './components/Footer/Footer';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const sectionRefs = {
    popularRecipes: useRef(null),
    testimonials: useRef(null),
    // Add more refs as needed
  };

  const scrollToSection = (sectionKey) => {
    if (sectionRefs[sectionKey] && sectionRefs[sectionKey].current) {
      sectionRefs[sectionKey].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const handleDishClick = async (dish) => {
    setLoading(true);
    try {
      const recipeData = await fetchRecipe(dish);
      setSelectedRecipe({
        ...recipeData,
        dishName: dish  // Store the selected dish name
      });
    } catch (error) {
      console.error('Error fetching recipe:', error);
      alert('Failed to fetch the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
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
        {selectedRecipe && (
          <div className="recipe">
            <h2>Recipe for {selectedRecipe.dishName}</h2>
            <pre>{selectedRecipe.ingredients}</pre>
          </div>
        )}
      </header>
      <footer className="App-footer">
        Built with ❤️ by Tridib and Shruti!
      </footer>
      <PopularRecipes ref={sectionRefs.popularRecipes} />
      <Testimonials ref={sectionRefs.testimonials} />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
