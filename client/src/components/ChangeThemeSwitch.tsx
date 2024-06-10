import React from 'react';
import { Switch } from '@mui/material';
import { useThemeContext } from '../services/theme/ThemeContext';

const ChangeTheme: React.FC = () => {
  const { toggleTheme, currentTheme } = useThemeContext();

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <Switch
      checked={currentTheme === 'dark'}
      onChange={handleThemeChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

export default ChangeTheme;
