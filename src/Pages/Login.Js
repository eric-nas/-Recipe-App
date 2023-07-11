import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(RecipeContext);
  const [formValid, setFormValid] = useState(false);
  const history = useHistory();

  const handleInput = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  useEffect(() => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const passMinLength = 6;
    const isPasswordValid = password.length > passMinLength;
    setFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          value={ password }
          name="password"
          data-testid="password-input"
          onChange={ handleInput }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !formValid }
        onClick={ () => console.log('Clicou') }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
