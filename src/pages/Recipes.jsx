import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes(props) {
  const { type } = props;
  return (
    <main>
      <div>
        { type === 'meals'
      && <Header title="Meals" searchIcon />}
        { type === 'drinks'
      && <Header title="Drinks" searchIcon /> }

      </div>
      <footer style={ { position: 'fixed' } }>
        <Footer />
      </footer>
    </main>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recipes;
