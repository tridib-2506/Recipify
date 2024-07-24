import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './SearchScreen.css'
import { getDishSuggestions } from '../../geminiService'
import { fetchRecipe } from '../../apiService'

const SearchScreen = () => {
  const [ingredients, setIngredients] = useState('');
  const [dishes, setDishes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.ingredients) {
      setIngredients(location.state.ingredients);
      handleCook(location.state.ingredients);
    }
  }, [location.state?.ingredients]);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    setIngredients(ingredient);
    handleCook(ingredient);
  };

  const handleCook = async (ingredientsToUse) => {
    setLoading(true);
    try {
      const suggestedDishes = await getDishSuggestions(ingredientsToUse || ingredients);
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
        dishName: dish
      });
    } catch (error) {
      console.error('Error fetching recipe:', error);
      alert('Failed to fetch the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipeDisplay">
      <div className="searchAreaRecipe">
        <div className="searchHeading">
          Enter raw materials
        </div>
        <div className="searchField">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" value={ingredients} onChange={handleInputChange} />
          <button onClick={() => handleCook()}>
            {loading ? 'Cooking...' : 'Cook'}
          </button>
        </div>
        <div className="tags">
          <span onClick={() => handleIngredientClick('Tomato')}>Tomato</span>
          <span onClick={() => handleIngredientClick('Mushroom')}>Mushroom</span>
          <span onClick={() => handleIngredientClick('Potato')}>Potato</span>
          <span onClick={() => handleIngredientClick('Carrot')}>Carrot</span>
          <span onClick={() => handleIngredientClick('Yoghurt')}>Yoghurt</span>
        </div>
      </div>
      <div className="dishes">
        {dishes.map((dish, index) => (
          <button key={index} onClick={() => handleDishClick(dish)}>{dish}</button>
        ))}
      </div>
      {selectedRecipe && (
        <>
          <div className="recipeFor">Recipe for {selectedRecipe.dishName}</div>
          <div className="recipeHead">
            <div className="ingred">Ingredients</div>
            <div className="inst">Instructions</div>
          </div>
          <div className="recipeBody">
            <div className="ingredDisplay">{selectedRecipe.ingredients}</div>
            <div className="instDisplay">{selectedRecipe.instructions}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchScreen
