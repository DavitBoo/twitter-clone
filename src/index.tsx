import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import App from './App';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

  :root {
    --color-text: rgb(15, 20, 25);
    --color-text-secondary: #536471;
    --color-background: white;
    --color-primary: #0099D1;
  }

  body{
    color: var(--color-text);
    font-family: 'Roboto', sans-serif;
  }

  h1{
    font-size: 1.25rem;
  }

  ul{
    list-style: none;
  }
  
  a{
    text-decoration: none;
    color: var(--color-text)
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


