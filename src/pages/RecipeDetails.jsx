import PropTypes from 'prop-types';
import React from 'react';

function MealDetails(props) {
  const { type } = props;
  return (
    <div>
      {type === 'meals'
      && <div>Meals details</div>}
      {type === 'drinks'
      && <div>Drinks details</div>}
    </div>
  );
}

MealDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MealDetails;
