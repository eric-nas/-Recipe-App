import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, } from '@testing-library/react';
import RecipeProvider from '../context/RecipeProvider';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Recipes from '../pages/Recipes';
import App from '../App';
import Login from '../pages/Login';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';

const renderWithRoute = () => render(
    <RecipeProvider>
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    </RecipeProvider>,
  );
  
  const emailTest = 'trybe@test.com'
  const passwordTest = '1234567'

  jest.setTimeout(9000000000);
  const history = createMemoryHistory();

describe('Testa component searchBar', () => {
  
    it('Verifica se o input de busca está na tela e pesquisa comidas com primeira letra', async () => {
       
          renderWithRoute();
        
        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();
        userEvent.type(inputSearch, 'a');
        const option = screen.getByTestId('first-letter-search-radio');
        userEvent.click(option);
        const button = screen.getByTestId('exec-search-btn');
        userEvent.click(button);
        await waitFor(() => {expect(screen.getByTestId('0-card-name')).toBeInTheDocument();}, { timeout: 10000 }) 
    });

    it('Verifica se o input de busca está na tela e pesquisa comidas pelo nome', async () => {
         
        renderWithRoute();
        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();
        userEvent.type(inputSearch, 'a');
        const option = screen.getByTestId('name-search-radio');
        userEvent.click(option);
        const button = screen.getByTestId('exec-search-btn');
        userEvent.click(button);
        await waitFor(() => {expect(screen.getByTestId('0-card-name')).toBeInTheDocument();}, { timeout: 10000 }) 
       
     
    });

    it ('Verifica se o input de busca está na tela e pesquisa comidas pelo ingrediente', async () => {
        render(<RecipeProvider>
            <BrowserRouter >
              <App/>
            </BrowserRouter>
        </RecipeProvider>);
        const buttonLogin = screen.getByTestId('login-submit-btn');
        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        userEvent.type(inputEmail, emailTest);
        userEvent.type(inputPassword, passwordTest);
        userEvent.click(buttonLogin);
        const buttons = screen.getByTestId('search-top-btn');
        userEvent.click(buttons);
        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();
        userEvent.type(inputSearch, 'Broad Beans');
        const option = screen.getByTestId('ingredient-search-radio');
        userEvent.click(option);
        const button = screen.getByTestId('exec-search-btn');
        userEvent.click(button);
        await waitFor(() => {expect(screen.getByTestId('0-card-name')).toBeInTheDocument();}, { timeout: 10000 }) 
    });

    it ('Verifica se o alerta é exibido quando a busca não retorna resultados', async () => {
      let alertaChamado = false;
        const originalAlert = window.alert;
        window.alert = jest.fn ((mensagem) => {
          alertaChamado = true;
          expect(mensagem).toBe('Sorry, we haven\'t found any recipes for these filters.');
        });
      render(<RecipeProvider>
        <BrowserRouter history={history}>
          <SearchBar type='drinks' />
        </BrowserRouter>
    </RecipeProvider>);
        // const buttonLogin = screen.getByTestId('login-submit-btn');
        // const inputEmail = screen.getByTestId('email-input');
        // const inputPassword = screen.getByTestId('password-input');
        // userEvent.type(inputEmail, emailTest);
        // userEvent.type(inputPassword, passwordTest);
        // userEvent.click(buttonLogin);
        // const buttons = screen.getByTestId('search-top-btn');
        // userEvent.click(buttons);
        
        const inputSearch = screen.getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();
        userEvent.type(inputSearch, 'xablau');
        const option = screen.getByTestId('name-search-radio');
        userEvent.click(option);
        const button = screen.getByTestId('exec-search-btn');
        userEvent.click(button);
        await waitFor(() => {expect(alertaChamado).toBe(true);}, { timeout: 10000 })
        window.alert = originalAlert;
    });

});