import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchIngrediente, fetchNome, fetchPrimeiraLetra } from '../services/Api';
import './SearchBar.css';

export default function SearchBar() {
  const [option, setOption] = useState('');
  const [pedido, setPedido] = useState([]);
  const [input, setInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/drinks' && pedido.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (pathname === '/meals' && pedido.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [pedido]);

  useEffect(() => {
    const { pathname } = window.location;
    async function fethData() {
      const url = pathname === '/meals'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a';

      const response = await fetch(url);
      const data = await response.json();
      setPedido(data);
    }
    fethData();
  }, []);

  const handleInput = ({ target }) => {
    const { name } = target;
    setOption(name);
  };

  const primeiraLetra = 'first-letter';

  const searchFood = async () => {
    if (option === primeiraLetra && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const { pathname } = window.location;

    switch (option) {
    case 'ingredient':
      setPedido(await fetchIngrediente(input, pathname));
      break;

    case 'name':
      setPedido(await fetchNome(input, pathname));
      break;

    case primeiraLetra:
      setPedido(await fetchPrimeiraLetra(input, pathname));
      break;
    default:
    }
  };

  const handleSearchInput = ({ target }) => {
    setInput(target.value);
  };

  const PushDetails = () => {
    const { push } = useHistory();
    if (pedido.meals && pedido.meals.length === 1) {
      push(`/meals/${pedido.meals[0].idMeal}`);
    }
    if (pedido.drinks && pedido.drinks.length === 1) {
      push(`/drinks/${pedido.drinks[0].idDrink}`);
    } else {
      <p />;
    }
  };
  PushDetails();
  const doze = 12;

  return (
    <div className="search-bar">
      <div>
        <input
          className="search-input"
          type="text"
          name="search"
          data-testid="search-input"
          placeholder="Search"
          onChange={ handleSearchInput }
        />
      </div>
      <div className="search-radio">
        <input
          className="ingredient-radio"
          type="radio"
          data-testid="ingredient-search-radio"
          checked={ option === 'ingredient' }
          onChange={ handleInput }
          name="ingredient"
          id="ingredient"
        />
        <label className="ingredient-label" htmlFor="ingredient">Ingrediente</label>
        <input
          className="name-radio"
          type="radio"
          data-testid="name-search-radio"
          checked={ option === 'name' }
          onChange={ handleInput }
          name="name"
          id="name"
        />
        <label className="name-label" htmlFor="name">Nome</label>
        <input
          className="first-letter-radio"
          type="radio"
          data-testid="first-letter-search-radio"
          checked={ option === 'first-letter' }
          onChange={ handleInput }
          name="first-letter"
          id="first-letter"
        />
        <label htmlFor="first-letter">Primeira letra</label>
      </div>
      <button
        className="search-btn"
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchFood }
      >
        Buscar

      </button>
      <div className="recipe-cards">
        {
          pedido.meals ? pedido.meals.slice(0, doze).map((item, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <button
                className="recipe-card-button"
                type="button"
                onClick={ () => history.push(`/meals/${item.idMeal}`) }
              >
                <img
                  className="recipe-img"
                  data-testid={ `${index}-card-img` }
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
                <p
                  className="recipe-name"
                  data-testid={ `${index}-card-name` }
                >
                  {item.strMeal}
                </p>
              </button>
            </div>
          )) : <p />
        }

        {
          pedido.drinks ? pedido.drinks.slice(0, doze).map((item, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <button
                className="recipe-card-button"
                type="button"
                onClick={ () => history.push(`/drinks/${item.idDrink}`) }
              >
                <img
                  className="recipe-img"
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
                <p
                  className="recipe-name"
                  data-testid={ `${index}-card-name` }
                >
                  {item.strDrink}
                </p>
              </button>
            </div>
          )) : <p />
        }

      </div>
    </div>
  );
}
