import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { Menu } from '../menu/Menu';

export interface Props extends BoxProps {}

const HomeLayout: React.FC<Props> = ({ children, sx, ...rest }) => (
  <Box sx={{ display: 'flex', ...sx }} {...rest}>
    <Menu width={220} />
    <div>{children}</div>
  </Box>
);

export default HomeLayout;
