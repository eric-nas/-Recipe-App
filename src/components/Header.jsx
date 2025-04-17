import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import { profileIcon, searchIconimg, logoRecipes, iconeRecipes,
  iconePrato, iconeBebida } from '../assets/images';
import './Header.css';

function Header(props) {
  const { title, searchIcon } = props;
  const history = useHistory();
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (title === 'Profile' || title === 'Done Recipes'
      || title === 'Favorite'
    ) {
      setShowInput(false);
    }
  }, [title]);

  return (
    <div className="header-container">
      <img
        alt="logo"
        src={ logoRecipes }
        className="logo-recipes"
      />
      <img
        alt="icone"
        src={ iconeRecipes }
        className="icone-recipes"
      />
      <button
        className="btn-profile"
        data-testid="btn-profile"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icone de perfil"
        />
      </button>
      { searchIcon && (
        <button
          className="btn-search"
          data-testid="btn-search"
          onClick={ () => setShowInput(!showInput) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIconimg }
            alt="Icone de pesquisa"
          />
        </button>
      ) }
      {showInput
      && (
        <SearchBar />
      )}
      {title === 'Meals' && <img
        className="dish-icon"
        src={ iconePrato }
        alt="icone Prato"
      />}
      {title === 'Drinks' && <img
        className="drink-icon"
        src={ iconeBebida }
        alt="icone Bebida"
      />}
      <h1
        className="header-title"
        data-testid="page-title"
      >
        { title }
      </h1>
    </div>
  );
}

Header.propTypes = {
  searchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
