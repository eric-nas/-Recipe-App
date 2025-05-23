import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeProvider from './context/RecipeProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <div className="index-container">
      <RecipeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipeProvider>
    </div>,
  );
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
