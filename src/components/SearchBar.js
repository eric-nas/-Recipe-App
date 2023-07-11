import React, { useState } from 'react';
import { fetchIngrediente, fetchNome, fetchPrimeiraLetra } from '../services/Api';

export default function SearchBar() {
  const [option, setOption] = useState('');
  const [pedido, setPedido] = useState([]);
  const [input, setInput] = useState('');

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

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleSearchInput }
        />
      </div>
      <label htmlFor="ingredient">Ingrediente</label>
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        checked={ option === 'ingredient' }
        onChange={ handleInput }
        name="ingredient"
      />
      <label htmlFor="name">Nome</label>
      <input
        type="radio"
        data-testid="name-search-radio"
        checked={ option === 'name' }
        onChange={ handleInput }
        name="name"
      />
      <label htmlFor="first-letter">Primeira letra</label>
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        checked={ option === 'first-letter' }
        onChange={ handleInput }
        name="first-letter"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchFood }
      >
        Buscar

      </button>
    </div>
  );
}
