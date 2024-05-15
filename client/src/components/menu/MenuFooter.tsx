import { Box, BoxProps } from '@mui/material';
import React from 'react';

import LogoutButton from '../UI/buttons/LogoutButton';
import LockButton from '../UI/buttons/LockButton';

interface Props extends BoxProps {}

const MenuFooter: React.FC<Props> = ({ sx, ...rest }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '12px', ...sx }} {...rest}>
      <LogoutButton />
      <LockButton />
    </Box>
  );
};

export default MenuFooter;
