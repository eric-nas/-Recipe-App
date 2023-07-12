const erro = 'Erro de requisição aos dados da API.';
const fetchIngrediente = async (ingredient, pathname) => {
  let url = '';

  if (pathname === '/meals') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(erro);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const fetchNome = async (name, pathname) => {
  let url = '';

  if (pathname === '/meals') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(erro);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const fetchPrimeiraLetra = async (firstLetter, pathname) => {
  let url = '';

  if (pathname === '/meals') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(erro);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {
  fetchIngrediente,
  fetchNome,
  fetchPrimeiraLetra,
};
