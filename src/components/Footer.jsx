import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            data-testid="drinks-bottom-btn"
            src="src/images/drinkIcon.svg"
            alt="drink-icon"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button type="button">
          <img
            data-testid="meals-bottom-btn"
            src="src/images/mealIcon.svg"
            alt="meals-icon"
          />
        </button>
      </Link>

    </footer>
  );
}

export default Footer;
