import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './DoneRecipes.css';
import { DoneIcon, fastFood, foods, drinks } from '../assets/images';

function DoneRecipes() {
  const [recipesDone, setDoneRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setAllRecipes(doneRecipes);
    setDoneRecipes(doneRecipes);
  }, []);

  function renderFoods() {
    const filteredRecipes = allRecipes.filter((recipe) => Object.keys(recipe)
      .includes('strMeal'));
    setDoneRecipes(filteredRecipes);
  }
  function renderDrinks() {
    const filteredRecipes = allRecipes.filter((recipe) => Object.keys(recipe)
      .includes('strDrink'));
    setDoneRecipes(filteredRecipes);
  }
  function renderAll() {
    setDoneRecipes(allRecipes);
  }
  return (
    <div>
      <Header title="Done Recipes" searchIcon={ false } />
      <img
        className="done-icon"
        src={ DoneIcon }
        alt="Done Icon"
      />
      <button
        onClick={ renderAll }
        className="fast-food-icon"
      >
        <img
          src={ fastFood }
          alt="Fast Food Icon"
        />
      </button>
      <button
        onClick={ renderFoods }
        className="foods-icon"
      >
        <img
          src={ foods }
          alt="Foods Icon"
        />
      </button>
      <button
        onClick={ renderDrinks }
        className="drinks-icon"
      >
        <img
          src={ drinks }
          alt="Drinks Icon"
        />
      </button>
      <div
        className="recipeDone-div"
      >
        {recipesDone.map((recipe) => (
          <div
            key={ recipe.idMeal || recipe.idDrink }
            className="recipeDone-card"
          >
            <img
              className="recipeDone-img"
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
            />
            <div className="recipeDone-info">
              <p
                className="recipeDone-name"
                key={ recipe.idMeal || recipe.idDrink }
              >
                {recipe.strMeal || recipe.strDrink}
              </p>
              <p
                className="recipeDone-category"
                key={ recipe.idMeal || recipe.idDrink }
              >
                {recipe.strCategory}
              </p>
              <p
                className="recipeDone-date"
                key={ recipe.idMeal || recipe.idDrink }
              >
                {recipe.doneDay}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
