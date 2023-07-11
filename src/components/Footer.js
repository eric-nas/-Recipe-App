import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Footer() {
  return (
    <div data-testid="footer">
      <Link to="/drinks">
        <button data-testid="drinks-bottom-btn" type="button">
          <img
            src="src/images/drinkIcon.svg"
            alt="drink-icon"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button data-testid="meals-bottom-btn" type="button">
          <img
            src="src/images/exploreIcon.svg"
            alt="explore-icon"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
