import PropTypes from 'prop-types';
import React from 'react';

function RecipeInProgress(props) {
  const { type } = props;
  return (
    <div>
      {type === 'meals'
      && <div>Meal in progress</div>}
      {type === 'drinks'
      && <div>Drink in progress</div>}
    </div>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
