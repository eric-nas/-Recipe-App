import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { ReactComponent as Tomate } from '../assets/images/tomate.svg';
import { ReactComponent as Logo } from '../assets/images/logo Recipes App.svg';
import { ReactComponent as Background } from '../assets/images/Background.svg';
import './Login.css';

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
      <div className="Login-top">
        <Background className="Background" />
        <Logo className="Logo" />
        <Tomate className="Tomate" />

      </div>
      <div className="Login-form">
        <label htmlFor="email">
          <span className="Email-hidden">Email</span>
          <input
            className="Input"
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleInput }
          />
        </label>
        <label className="Password-Label" htmlFor="password">
          <span className="Password-hidden">Password</span>
          <input
            className="Input"
            placeholder="Senha"
            type="password"
            id="password"
            value={ password }
            name="password"
            data-testid="password-input"
            onChange={ handleInput }
          />
        </label>
        <button
          className="Login-btn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !formValid }
          onClick={ () => console.log('Clicou') }
        >
          ENTRAR
        </button>
      </div>
    </form>
  );
}

export default Login;
