import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RecipeDetails.css';
import { emojiShortcake, emojiDrink, like,
  vector } from '../assets/images';

function MealDetails({ match, type }) {
  const [pedido, setPedido] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeIcon, setLikeIcon] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const { id } = match.params;
      const url = type === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(url);
      const data = await response.json();
      setPedido(data);
      setLoading(false);
    }
    fetchData();
  }, [match.params, type]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const pedidoNome = pedido.meals?.[0].strMeal || pedido.drinks?.[0].strDrink;
      if (favoriteRecipes.includes(pedidoNome)) {
        setLikeIcon(true);
      }
    }
  }, [pedido]);

  function likeButton() {
    const pedidoNome = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (pedidoNome.includes(pedido.meals?.[0].strMeal || pedido.drinks?.[0].strDrink)) {
      const filterRecipeName = pedidoNome.filter((item) => item
      !== pedido.meals?.[0].strMeal
      || pedido.drinks?.[0].strDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecipeName));
      setLikeIcon(false);
    } else {
      pedidoNome.push(pedido.meals?.[0].strMeal || pedido.drinks?.[0].strDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(pedidoNome));
      setLikeIcon(true);
    }
  }

  if (loading) return <p>Loading...</p>;

  const recipe = type === 'meals' ? pedido.meals?.[0] : pedido.drinks?.[0];

  const getIngredients = () => Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe?.[`strIngredient${i + 1}`];
    const measure = recipe?.[`strMeasure${i + 1}`];
    return ingredient ? `${ingredient} - ${measure}` : null;
  }).filter(Boolean);
  return (
    <div>
      <button
        className="like-btn"
        onClick={ likeButton }
      >
        <img
          className="like-icon"
          src={ likeIcon ? vector : like }
          alt="like"
        />
      </button>
      <h3 className="recipe-name-details">{recipe?.strMeal || recipe?.strDrink}</h3>
      <img
        className="recipe-details-img"
        src={ recipe?.strMealThumb || recipe?.strDrinkThumb }
        alt="Meal"
      />
      <div className="grey" />
      <img
        className="recipe-details-emoji"
        src={ type === 'meals' ? emojiShortcake : emojiDrink }
        alt="Emoji"
      />
      <p className="recipe-details-category">
        { recipe?.strCategory || recipe?.strAlcoholic }
      </p>

      <h3 className="ingredients-h3">Ingredients</h3>
      <div className="recipe-ingredients-container">
        <ul className="recipe-ingredients-list">
          {getIngredients().map((ingredient, index) => (
            <li key={ index } className="recipe-ingredients-card">
              { ingredient }
            </li>
          ))}
        </ul>
      </div>
      <h3 className="instructions-h3">Instructions</h3>
      <div className="recipe-instructions-container">
        <p className="recipe-instructions">{ recipe?.strInstructions }</p>
      </div>
      {type === 'meals' && recipe?.strYoutube && (
        <div>
          <h3 className="video-h3">Video</h3>
          <div className="recipe-video-container">
            <iframe
              className="recipe-video"
              title="video"
              width="320"
              height="350"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <button
        className="start-recipe-btn"
        onClick={ () => {
          if (type === 'meals') {
            history.push(`/meals/${recipe.idMeal}/in-progress`);
          } else {
            history.push(`/drinks/${recipe.idDrink}/in-progress`);
          }
        } }
      >
        Start Recipe
      </button>
    </div>
  );
}

MealDetails.propTypes = {
  type: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MealDetails;
