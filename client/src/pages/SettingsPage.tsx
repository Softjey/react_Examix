import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import HomeLayout from '../components/layouts/HomeLayout';
import ChangePinCode from '../components/ChangePinCode';
import ChangeTheme from '../components/ChangeTheme';
import ChangeUserInfo from '../components/ChangeUserInfo';
import DeleteAccount from '../components/DeleteAccount';

const SettingsPage: React.FC = () => (
  <HomeLayout centered>
    <Stack spacing={2}>
      <Typography variant="h6" color="black" paddingLeft="15px">
        My Profile
      </Typography>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ChangeUserInfo />
      </Box>

      <Typography variant="h6" color="black" paddingLeft="15px">
        Security
      </Typography>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ChangePinCode />
        <Typography marginLeft={2} color="gray" variant="body1">
          Customize your security settings
        </Typography>
      </Box>

      <Typography variant="h6" color="black" paddingLeft="15px">
        Appearance
      </Typography>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ChangeTheme />
        <Typography marginLeft={2} color="gray" variant="body1">
          Customize the appearance of the app
        </Typography>
      </Box>

      <Typography variant="h6" color="black" paddingLeft="15px">
        Delete Account
      </Typography>
      <Divider />
      <Box sx={{ p: 1 }}>
        <DeleteAccount />
        <Typography marginLeft={2} color="gray" variant="body1">
          Permanently delete your account
        </Typography>
      </Box>
    </Stack>
  </HomeLayout>
);

export default SettingsPage;
