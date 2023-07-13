import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RecipeProvider from '../context/RecipeProvider';

import App from '../App';

test('Teste de cobertura para o Footer', () => {
  render(
    <RecipeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipeProvider>,
  );
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginButton = screen.getByTestId('login-submit-btn');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();

  userEvent.type(emailInput, 'cassiogostosomaravilhoso@tribe.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginButton);

  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument();
  const drinksButton = screen.getByTestId('drinks-bottom-btn');
  const mealsButton = screen.getByTestId('meals-bottom-btn');
  expect(drinksButton).toBeInTheDocument();
  expect(mealsButton).toBeInTheDocument();
});
