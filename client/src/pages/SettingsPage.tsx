import React from 'react';
import { List, Box } from '@mui/material';
import HomeLayout from '../components/layouts/HomeLayout';
import ChangePinCode from './ChangePinCode';
import ChangeTheme from './ChangeTheme';
import ChangeUserInfo from './ChangeUserInfo';
import DeleteAccount from './DeleteAccount';

const SettingsPage: React.FC = () => {
  return (
    <HomeLayout>
      <Box sx={{ bgcolor: 'background.paper', color: 'text.primary', height: '100vh', p: 1 }}>
        <List sx={{ width: '100%', maxWidth: 350, paddingTop: 0, bgcolor: 'background.paper' }}>
          <Box sx={{ mb: 1 }}>
            <ChangeUserInfo />
          </Box>
          <Box sx={{ mb: 1 }}>
            <ChangePinCode />
          </Box>
          <Box sx={{ mb: 1 }}>
            <ChangeTheme />
          </Box>
          <Box sx={{ mb: 1 }}>
            <DeleteAccount />
          </Box>
        </List>
      </Box>
    </HomeLayout>
  );
};

export default SettingsPage;
