import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import HomeLayout from '../components/layouts/HomeLayout';
import ChangePinCode from '../components/ChangePinCode';
import ChangeTheme from '../components/ChangeTheme';
import ChangeUserInfo from '../components/ChangeUserInfo';
import DeleteAccount from '../components/DeleteAccount';

const sx = {
  padding: '25px',
};

const SettingsPage: React.FC = () => {
  return (
    <HomeLayout>
      <Box sx={sx}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="settings table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <ChangeUserInfo />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <ChangePinCode />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <ChangeTheme />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DeleteAccount />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </HomeLayout>
  );
};

export default SettingsPage;
