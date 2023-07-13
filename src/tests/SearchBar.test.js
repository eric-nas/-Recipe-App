import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeProvider from '../context/RecipeProvider';
import SearchBar from '../components/SearchBar';
import App from '../App';

const renderWithRoute = () => render(
  <RecipeProvider>
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  </RecipeProvider>,
);

jest.setTimeout(9000000000);

const alertmsg = 'Sorry, we haven\'t found any recipes for these filters.';
const searcButton = 'search-top-btn';
const nameRadio = 'name-search-radio';
const emailTest = 'teste@trybe.com';
const passwordTest = '1234567';
const searchInput = 'search-input';
const buttonSearch = 'exec-search-btn';

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

  it('Verifica se o input de busca está na tela e pesquisa comidas pelo ingrediente', async () => {
    render(
      <RecipeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipeProvider>,
    );
    const buttonLogin = screen.getByTestId('login-submit-btn');
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, passwordTest);
    userEvent.click(buttonLogin);
    const buttons = screen.getByTestId(searcButton);
    userEvent.click(buttons);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Broad Beans');
    const option = screen.getByTestId('ingredient-search-radio');
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(screen.getByTestId('0-card-name')).toBeInTheDocument(); }, { timeout: 10000 });
  });

  it('Verifica se o alerta é exibido quando a busca não retorna resultados', async () => {
    let alertaChamado = false;
    const originalAlert = window.alert;
    window.alert = jest.fn((mensagem) => {
      alertaChamado = true;
      expect(mensagem).toBe(alertmsg);
    });
    render(
      <RecipeProvider>
        <BrowserRouter>
          <SearchBar />
        </BrowserRouter>
      </RecipeProvider>,
    );

    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'xablau');
    const option = screen.getByTestId(nameRadio);
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(alertaChamado).toBe(true); }, { timeout: 10000 });
    window.alert = originalAlert;
  });

  it('Verifica se o alerta é exibido quando a busca não retorna resultados', async () => {
    let alertaChamado = false;
    const originalAlert = window.alert;
    window.alert = jest.fn((mensagem) => {
      alertaChamado = true;
      expect(mensagem).toBe(alertmsg);
    });
    render(
      <RecipeProvider>
        <BrowserRouter>
          <SearchBar />
        </BrowserRouter>
      </RecipeProvider>,
    );

    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'xablau');
    const option = screen.getByTestId(nameRadio);
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(alertaChamado).toBe(true); }, { timeout: 10000 });
    window.alert = originalAlert;
  });
  it('Verifica se o alerta é exibido quando a busca não retorna resultados para drinks', async () => {
    let alertaChamado = false;
    const originalAlert = window.alert;
    window.alert = jest.fn((mensagem) => {
      alertaChamado = true;
      expect(mensagem).toBe(alertmsg);
    });
    render(
      <RecipeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipeProvider>,
    );
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkButton);
    const buttons = screen.getByTestId(searcButton);
    userEvent.click(buttons);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'xablau');
    const option = screen.getByTestId(nameRadio);
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(alertaChamado).toBe(true); }, { timeout: 10000 });
    window.alert = originalAlert;
  });
  it('Verifica se é exibido um alerta quando a busca em primeira letra é feita com mais de uma letra', async () => {
    let alertaChamado = false;
    const originalAlert = window.alert;
    window.alert = jest.fn((mensagem) => {
      alertaChamado = true;
      expect(mensagem).toBe('Your search must have only 1 (one) character');
    });
    render(
      <RecipeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipeProvider>,
    );
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkButton);
    const buttons = screen.getByTestId(searcButton);
    userEvent.click(buttons);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'xab');
    const option = screen.getByTestId('first-letter-search-radio');
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(alertaChamado).toBe(true); }, { timeout: 10000 });
    window.alert = originalAlert;
  });
  it('Verifica se a busca por apenas uma comida direciona para a página de detalhes', async () => {
    render(
      <RecipeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipeProvider>,
    );
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);
    const buttons = screen.getByTestId(searcButton);
    userEvent.click(buttons);
    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Broad Beans');
    const option = screen.getByTestId(nameRadio);
    userEvent.click(option);
    const button = screen.getByTestId(buttonSearch);
    userEvent.click(button);
    await waitFor(() => { expect(screen.getByText('Meals details')).toBeInTheDocument(); }, { timeout: 10000 });
  });
});
