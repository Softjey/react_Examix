import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HomeLayout from '../components/layouts/HomeLayout';
import ChangePinCode from '../components/ChangePinCode';
import ChangeTheme from '../components/ChangeTheme';
import ChangeUserInfo from '../components/ChangeUserInfo';
import DeleteAccount from '../components/DeleteAccount';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  width: '100%',
  color: 'gray',
}));

const SettingsPage: React.FC = () => {
  return (
    <HomeLayout>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          <Item>
            <Typography variant="h4" color="black" paddingLeft="50px">
              My Profile
            </Typography>
            <ChangeUserInfo />
          </Item>
          <Item>
            <Typography variant="h4" color="black" paddingLeft="50px">
              Pin Code
            </Typography>
            <ChangePinCode />
          </Item>
          <Item>
            <Typography variant="h4" color="black" paddingLeft="50px">
              Apperance
            </Typography>
            <ChangeTheme />
          </Item>
          <Item>
            <DeleteAccount />
          </Item>
        </Stack>
      </Box>
    </HomeLayout>
  );
};

export default SettingsPage;
