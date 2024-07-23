import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { getDishSuggestions } from './geminiService';
import { fetchRecipe } from './apiService';
import Testimonials from './components/Testimonials/Testimonials';
import PopularRecipes from './components/PopularRecipes/PopularRecipes';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import SearchScreen from './components/SearchScreen/SearchScreen';
import { Layout } from './components/Layout/Layout';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const sectionRefs = {
    popularRecipes: useRef(null),
    testimonials: useRef(null),
    footer: useRef(null),
    home: useRef(null),
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
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}/>
          <Route 
          index element={[<Home ref={sectionRefs.home} scrollToSection={scrollToSection}/>,<PopularRecipes ref={sectionRefs.popularRecipes} />,
          <Testimonials ref={sectionRefs.testimonials} />,
          <Footer ref={sectionRefs.footer} scrollToSection={scrollToSection} />]} />
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
