/**
 * Application Entry Point
 * 
 * Renders the React app into the DOM and sets up React Strict Mode
 * for better development experience and error detection.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
