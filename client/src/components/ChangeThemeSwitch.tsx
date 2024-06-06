import React, { useState } from 'react';
import { Switch } from '@mui/material';

const ChangeTheme: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Switch
      checked={isDarkMode}
      onChange={handleThemeChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

export default ChangeTheme;
