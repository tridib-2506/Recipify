import React from 'react'
import './SearchScreen.css'

const SearchScreen = () => {
  return (
    <div className="recipeDisplay">
      <div className="searchAreaRecipe">
        <div className="searchHeading">
          Enter raw materials
        </div>
        <div className="searchField">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" />
          <button>COOK</button>
        </div>
        <div className="tags">
          <span>Tomato</span>
          <span>Mushroom</span>
          <span>Potato</span>
          <span>Carrot</span>
          <span>Yoghurt</span>
        </div>
      </div>
      <div className="dishes">
        <button>Dish1</button>
        <button>Dish2</button>
        <button>Dish3</button>
        <button>Dish4</button>
        <button>Dish5</button>
      </div>
      <div className="recipeFor">Recipe for Dish1</div>
      <div className="recipeHead">
        <div className="ingred">
          Ingredients
        </div>
        <div className="inst">
          Instructions
        </div>
      </div>
      <div className="recipeBody">
        <div className="ingredDisplay">
          Cookkdjfjojfof
        </div>
        <div className="instDisplay">
          nfiifiifbif
        </div>
      </div>
    </div>
  )
}

export default SearchScreen
