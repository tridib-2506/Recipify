import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <>
      <div className='home'>
        <div className="upper">
          <div className="navbar">
            <div className="navName">Recipify</div>
            <div className="navButtons">
              <button>Popular Recipes</button>
              <button>What They Say</button>
              <button>Contact Us</button>
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
      </div>
    </>
  )
}

export default Home
