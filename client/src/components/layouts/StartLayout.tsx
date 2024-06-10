import React from 'react';
import { Box, BoxProps } from '@mui/material';
import Header from '../common/Header';
import { center, columnCenter } from '../../styles/flex';

export interface Props extends BoxProps {
  header?: boolean;
  backBtn?: boolean;
}

const StartLayout: React.FC<Props> = ({ children, sx, header = true, backBtn = false }) => (
  <Box sx={{ minHeight: '100vh', ...center, ...sx }}>
    <Box
      sx={{
        height: '300px',
        justifyContent: 'flex-start',
        gap: '20px',
        ...columnCenter,
      }}
    >
      {header && <Header disableBackBtn={!backBtn} />}
      {children}
    </Box>
  </Box>
);

export default StartLayout;
