// src/context/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to light
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('shop-theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Apply theme attribute to HTML tag and persist in localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shop-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}