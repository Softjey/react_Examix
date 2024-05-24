import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { Menu } from '../common/Menu/Menu';

export interface Props extends BoxProps {
  contentSx?: BoxProps['sx'];
}

const HomeLayout: React.FC<Props> = ({ children, sx, contentSx, ...rest }) => (
  <Box sx={{ display: 'flex', ...sx }} {...rest}>
    <Menu width={220} />
    <Box sx={{ flexGrow: '1', minHeight: '100vh', ...contentSx }}>{children}</Box>
  </Box>
);

export default HomeLayout;
