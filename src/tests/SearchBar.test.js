import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeProvider from '../context/RecipeProvider';
import SearchBar from '../components/SearchBar';

const renderWithRoute = () => render(
  <RecipeProvider>
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  </RecipeProvider>,
);

jest.setTimeout(9000000000);

const buttonSearch = 'exec-search-btn';
const searchInput = 'search-input';

describe('Testa component searchBar', () => {
  it('Verifica se o input de busca está na tela e pesquisa comidas com primeira letra', async () => {
    renderWithRoute();

    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'a');
    const option = screen.getByTestId('first-letter-search-radio');
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(screen.getByTestId('0-card-name')).toBeInTheDocument(); }, { timeout: 10000 });
  });

  it('Verifica se o input de busca está na tela e pesquisa comidas pelo nome', async () => {
    renderWithRoute();
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'a');
    const option = screen.getByTestId('name-search-radio');
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(screen.getByTestId('0-card-name')).toBeInTheDocument(); }, { timeout: 10000 });
  });

  it('Verifica se o input de busca está na tela e pesquisa comidas pelo ingrediente', async () => {
    renderWithRoute();
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Broad Beans');
    const option = screen.getByTestId('name-search-radio');
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(screen.getByText(/Meals details/i)).toBeInTheDocument(); }, { timeout: 10000 });
  });
});
