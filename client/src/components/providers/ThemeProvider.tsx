import React, { useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from '../../services/theme/darkTheme';
import lightTheme from '../../services/theme/lightTheme';
import { ThemeContext } from '../../services/theme/ThemeContext';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const contextValue = useMemo(() => {
    const toggleTheme = () => {
      setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
