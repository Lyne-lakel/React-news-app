import React, { useContext } from 'react';
import { NewsContext } from '../context/NewsContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(NewsContext);

  return (
    <button onClick={toggleTheme} className="btn">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;