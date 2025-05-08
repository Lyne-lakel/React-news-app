import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { NewsProvider } from './context/NewsContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NewsProvider>
      <App />
    </NewsProvider>
  </React.StrictMode>
);