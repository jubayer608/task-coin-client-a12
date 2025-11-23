import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Default to light, only use saved if it exists
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'light';
  });

  // Apply theme whenever it changes or on mount
  useEffect(() => {
    const applyTheme = (themeValue) => {
      // Apply to all possible elements
      const allElements = [
        document.querySelector('[data-theme]'),
        document.documentElement,
        document.body,
        document.getElementById('root')
      ];
      
      allElements.forEach(el => {
        if (el) {
          el.setAttribute('data-theme', themeValue);
        }
      });
      
      // Also query all elements with data-theme and update them
      document.querySelectorAll('[data-theme]').forEach(el => {
        el.setAttribute('data-theme', themeValue);
      });
      
      localStorage.setItem('theme', themeValue);
      
      // Debug log (remove in production)
      console.log('Theme applied:', themeValue);
    };

    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

