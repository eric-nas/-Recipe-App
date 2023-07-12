import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, searchIcon } = props;
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  console.log('render');
  return (
    <div>
      <button
        data-testid="btn-profile"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="Icone de perfil"
        />
      </button>
      { searchIcon && (
        <button
          data-testid="btn-search"
          onClick={ () => setShowInput(!showInput) }
        >
          <img
            data-testid="search-top-btn"
            src="src/images/searchIcon.svg"
            alt="Icone de pesquisa"
          />
        </button>
      ) }
      {showInput
      && (
        <SearchBar />
      )}
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header.propTypes = {
  searchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
