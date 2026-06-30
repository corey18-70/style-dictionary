import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './ThemeContext';
import { App } from './App';

// Base primitive tokens
import './tokens/base.css';
// Semantic theme tokens — one file per theme
import './tokens/wireframe-light.css';
import './tokens/wireframe-dark.css';
import './tokens/bcbs-light.css';
import './tokens/bcbs-dark.css';
import './tokens/healthspring-light.css';
import './tokens/healthspring-dark.css';
import './tokens/easify-light.css';
import './tokens/easify-dark.css';
// Global resets / base styles
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
