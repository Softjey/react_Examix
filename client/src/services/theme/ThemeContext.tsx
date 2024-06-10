import { createContext, useContext } from 'react';

export interface ThemeContextType {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext have to be used only in ThemeProvider');
  }

  return context;
};
