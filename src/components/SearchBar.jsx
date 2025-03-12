import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchIngrediente, fetchNome, fetchPrimeiraLetra } from '../services/Api';
import './SearchBar.css';

export default function SearchBar() {
  const [option, setOption] = useState('');
  const [pedido, setPedido] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/drinks' && pedido.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (pathname === '/meals' && pedido.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [pedido]);

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
      <div>
        {
          pedido.meals ? pedido.meals.slice(0, doze).map((item, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                {item.strMeal}
              </p>
              <img
                data-testid={ `${index}-card-img` }
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
            </div>
          )) : <p />
        }

        {
          pedido.drinks ? pedido.drinks.slice(0, doze).map((item, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                {item.strDrink}
              </p>
              <img
                data-testid={ `${index}-card-img` }
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
            </div>
          )) : <p />
        }

      </div>
    </div>
  );
}
