import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import App from './App';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --color-text: black;
    --color-background: white;
    --color-primary: rebeccapurple;
  }
`;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);


