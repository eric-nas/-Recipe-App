import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
