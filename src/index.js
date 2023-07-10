import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeProvider from './context/RecipeContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <RecipeProvider>
      <App />
    </RecipeProvider>,
  );
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
