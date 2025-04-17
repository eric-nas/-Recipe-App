import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { vector, fastFood, foods, drinks,
  likeFavorite } from '../assets/images';
import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setAllRecipes(savedRecipes);
    setFavoriteRecipes(savedRecipes);
  }, []);
  const likeButton = (id) => {
    const deleteRecipe = favoriteRecipes.filter((recipe) => recipe.idMeal
    !== id
    && recipe.idDrink
    !== id);
    setFavoriteRecipes(deleteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteRecipe));
  };

  function renderAll() {
    setFavoriteRecipes(allRecipes);
  }

  function renderFoods() {
    const foodRecipes = allRecipes.filter((recipe) => Object.keys(recipe)
      .includes('strMeal'));
    setFavoriteRecipes(foodRecipes);
  }

  function renderDrinks() {
    const drinkRecipes = allRecipes.filter((recipe) => Object.keys(recipe)
      .includes('strDrink'));
    setFavoriteRecipes(drinkRecipes);
  }

  return (
    <div>
      <Header title="Favorite" />
      <img
        className="done-icon"
        src={ likeFavorite }
        alt="like icon"
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
        {favoriteRecipes.map((recipe) => (
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
              <button
                className="like-btn-favorite"
                onClick={ () => likeButton(recipe.idMeal || recipe.idDrink) }
              >
                <img
                  src={ vector }
                  alt="Icone de favoritar"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
