import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ChangeTheme: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ListItem>
      <ListItemIcon sx={{ minWidth: 50 }}>
        {isDarkMode ? (
          <Brightness7Icon sx={{ fontSize: 40 }} />
        ) : (
          <Brightness4Icon sx={{ fontSize: 40 }} />
        )}
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="h6">Toggle Theme</Typography>}
        sx={{ marginRight: 2 }}
      />
      <Switch
        checked={isDarkMode}
        onChange={handleThemeChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </ListItem>
  );
};

export default ChangeTheme;
