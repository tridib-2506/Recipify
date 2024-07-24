import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Home.css'

const Home = React.forwardRef(({ scrollToSection }, ref) => {
  const [ingredients, setIngredients] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    setIngredients(ingredient);
    navigate('/search', { state: { ingredients: ingredient } });
  };

  return (
    <>
    <section ref={ref} id="home">
      <div className='home'>
        <div className="upper">
          <div className="navbar">
            <div className="navName" onClick={() => scrollToSection('home')}>Recipify</div>
            <div className="navButtons">
              <button onClick={() => scrollToSection('popularRecipes')}>Popular Recipes</button>
              <button onClick={() => scrollToSection('testimonials')}>What They Say</button>
              <button onClick={() => scrollToSection('footer')}>Contact Us</button>
            </div>
          </div>
          <div className="content">
            <div className="appName">
              Recipify
            </div>
            <div className="caption">
              Stuck in a cooking rut? Enter your ingredients on Recipify and get delicious dish ideas instantly. Click for step-by-step recipes. Cook confidently and enjoy every meal with Recipify—your fun kitchen buddy!
            </div>
          </div>
        </div>
        <div className="lower">

        </div>

        <div className="pizza">
          <img src="src/components/Home/pizz.png" alt="Pizza" />
        </div>
        <div className="searchArea">
          <div className="searchHeading">
            Enter raw materials
          </div>
          <div className="searchField">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" value={ingredients} onChange={handleInputChange} />
            <Link to="/search" state={{ ingredients }} className="cook">COOK</Link>
          </div>
          <div className="tags">
            <button onClick={() => handleIngredientClick('Tomato')}>Tomato</button>
            <button onClick={() => handleIngredientClick('Mushroom')}>Mushroom</button>
            <button onClick={() => handleIngredientClick('Potato')}>Potato</button>
            <button onClick={() => handleIngredientClick('Carrot')}>Carrot</button>
            <button onClick={() => handleIngredientClick('Yoghurt')}>Yoghurt</button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
});

export default Home
