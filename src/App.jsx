import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Testimonials from './components/Testimonials/Testimonials';
import PopularRecipes from './components/PopularRecipes/PopularRecipes';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import SearchScreen from './components/SearchScreen/SearchScreen';
import { Layout } from './components/Layout/Layout';

function App() {
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

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route 
              index 
              element={[
                <Home ref={sectionRefs.home} scrollToSection={scrollToSection}/>,
                <PopularRecipes ref={sectionRefs.popularRecipes} />,
                <Testimonials ref={sectionRefs.testimonials} />,
                <Footer ref={sectionRefs.footer} scrollToSection={scrollToSection} />
              ]} 
            />
            <Route path="/search" element={<SearchScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
