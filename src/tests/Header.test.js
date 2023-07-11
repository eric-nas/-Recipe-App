import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import RecipeProvider from '../context/RecipeProvider';
import Header from '../components/Header';

describe('Testa component Header', () => {
  const renderWithRoute = (title, searchIcon) => render(
    <RecipeProvider>
      <BrowserRouter>
        <Header title={ title } searchIcon={ searchIcon } />
      </BrowserRouter>
    </RecipeProvider>,
  );
  test('Header na rota /meals', () => {
    renderWithRoute('Meals', true);
    const title = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Ao clicar no icone de Profile, redireciona para /profile', () => {
    renderWithRoute('Drinks', true);
    const profileBtn = screen.getByTestId('btn-profile');
    userEvent.click(profileBtn);
    const url = window.location.pathname;
    expect(url).toBe('/profile');
  });
  test('Ao clicar no icone de Search, mostra/esconder input de busca', () => {
    renderWithRoute('Drinks', true);
    const searchIcon = screen.getByTestId('btn-search');
    userEvent.click(searchIcon);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(input).not.toBeInTheDocument();
  });
});
