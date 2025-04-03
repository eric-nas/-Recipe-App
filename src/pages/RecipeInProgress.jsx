import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { like, vector, emojiShortcake,
  emojiDrink } from '../assets/images';
import './RecipeInProgress.css';

function RecipeInProgress(props) {
  const { type, match } = props;
  const [pedido, setPedido] = useState([]);
  const [likeIcon, setLikeIcon] = useState(false);
  const [loading, setLoading] = useState(true);
  const recipe = type === 'meals' ? pedido.meals?.[0] : pedido.drinks?.[0];
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
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const pedidoNome = pedido.meals?.[0].strMeal || pedido.drinks?.[0].strDrink;
    const isFavorite = favoriteRecipes.some((recipeFav) => recipeFav.strMeal
      === pedidoNome
      || recipeFav.strDrink === pedidoNome);
    setLikeIcon(isFavorite);
  }, [pedido]);

  function likeButton() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((recipeFav) => recipeFav.strMeal
      === pedido.meals?.[0]?.strMeal
      && recipeFav.strDrink === pedido.drinks?.[0]?.strDrink)) {
      const filterRecipe = favoriteRecipes.filter((item) => item.strMeal
      !== pedido.meals?.[0]?.strMeal
      || item.strDrink !== pedido.drinks?.[0]?.strDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecipe));
      setLikeIcon(false);
    } else {
      const newRecipe = pedido.meals?.[0] || pedido.drinks?.[0];
      favoriteRecipes.push(newRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setLikeIcon(true);
    }
  }

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipeDoneExist = doneRecipes.filter((recipeDone) => recipeDone.idMeal
    !== recipe.idMeal
    || recipeDone.idDrink !== recipe.idDrink);
    const date = new Date();
    const day = date.toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
    recipe.doneDay = `Done in: ${day}`;
    localStorage.setItem('doneRecipes', JSON.stringify([...recipeDoneExist, recipe]));
    history.push('/done-recipes');
  };

  const getIngredients = () => Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe?.[`strIngredient${i + 1}`];
    const measure = recipe?.[`strMeasure${i + 1}`];
    return ingredient ? `${ingredient} - ${measure}` : null;
  }).filter(Boolean);

  if (loading) return <p>Loading...</p>;

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
        {recipe?.strCategory || recipe?.strAlcoholic}
      </p>
      <h3 className="ingredients-h3">Ingredients</h3>
      <div className="recipe-ingredients-container">
        <ul className="recipe-ingredients-list-progress">
          {getIngredients().map((ingredient, index) => (
            <li key={ index } className="recipe-ingredients-card">
              <input
                className="checkbox"
                type="checkbox"
                id={ `ingredient-${index}` }
                name={ `ingredient-${index}` }
              />
              <label htmlFor={ `ingredient-${index}` }>{ingredient}</label>
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
        onClick={ finishRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecipeInProgress;
