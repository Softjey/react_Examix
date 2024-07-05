import React, { useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from '../../services/theme/darkTheme';
import lightTheme from '../../services/theme/lightTheme';
import { ThemeContext } from '../../services/theme/ThemeContext';
import storage from '../../services/storage';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';

  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    () => storage.read('theme') ?? preferredTheme,
  );

  const contextValue = useMemo(() => {
    const toggleTheme = () => {
      setThemeMode((prevMode) => {
        const newTheme = prevMode === 'light' ? 'dark' : 'light';
        storage.write('theme', newTheme);
        return newTheme;
      });
    };

    return {
      toggleTheme,
      currentTheme: themeMode,
    };
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
