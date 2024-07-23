import React from 'react';
import './Footer.css';

const Footer = React.forwardRef(({ scrollToSection }, ref) => {
  return (
    <>
    <section ref={ref} id="footer">
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-title">Recipify</div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nisl nunc tincidunt urna, id lacinia nunc nunc vel nunc.</p>
        </div>

        <div className="footer-column2">
          <h3 className="footer-heading">Contacts</h3>
          <ul className="name-list">
            <li>Tridib Nandi 
              <ul>
                <li><a href="https://www.linkedin.com/in/tridib--nandi/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </li>
            <li> Shruti Gupta 
              <ul>
                <li><a href="https://www.linkedin.com/in/shrutigupta0806/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Discover</h3>
          <ul className="footer-list">
            <li><a href="#">Get Dishes Suggestions</a></li>
            <li><a onClick={() => scrollToSection('popularRecipes')}>Popular Recipes</a></li>
            <li><a onClick={() => scrollToSection('testimonials')}>What They Say</a></li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        <p>&copy; Built with ❤️ by Tridib and Shruti in India!</p>
      </div>
    </footer>
    </section>
    </>
  );
});

export default Footer;