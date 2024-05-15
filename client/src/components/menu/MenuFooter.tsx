import { Box, BoxProps, Button } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';

interface Props extends BoxProps {}

const MenuFooter: React.FC<Props> = ({ sx, ...rest }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '12px', ...sx }} {...rest}>
      <Button variant="outlined" endIcon={<LogoutIcon />}>
        Log out
      </Button>
      <Button variant="contained" color="primary">
        <LockIcon fontSize="medium" />
      </Button>
    </Box>
  );
};

export default MenuFooter;
