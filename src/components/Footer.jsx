import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Footer.css';
import { iconePrato, iconeBebida } from '../assets/images';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <button className="drink-icon-footer" type="button">
          <img
            data-testid="drinks-bottom-btn"
            src={ iconeBebida }
            alt="drink-icon"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button className="dish-icon-footer" type="button">
          <img
            data-testid="meals-bottom-btn"
            src={ iconePrato }
            alt="meals-icon"
          />
        </button>
      </Link>

    </footer>
  );
}

export default Footer;
