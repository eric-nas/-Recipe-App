import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function Recipes(props) {
  const { type } = props;
  return (
    <div>
      { type === 'meals'
      && <Header title="Meals" searchIcon />}
      { type === 'drinks'
      && <Header title="Drinks" searchIcon /> }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recipes;
