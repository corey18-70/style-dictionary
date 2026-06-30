import { createContext, useContext, useState, useEffect } from 'react';

export const BRANDS = [
  { id: 'wireframe',    label: 'Wireframe'    },
  { id: 'bcbs',         label: 'BCBS'         },
  { id: 'healthspring', label: 'HealthSpring' },
  { id: 'easify',       label: 'Easify'       },
];

export const MODES = [
  { id: 'light', label: 'Light' },
  { id: 'dark',  label: 'Dark'  },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [brand, setBrand] = useState('wireframe');
  const [mode,  setMode]  = useState('light');

  const theme = `${brand}-${mode}`;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ brand, setBrand, mode, setMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
