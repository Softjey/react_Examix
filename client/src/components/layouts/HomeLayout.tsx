import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { Menu } from '../common/Menu/Menu';
import { columnCenter } from '../../styles/flex';

export interface Props extends BoxProps {
  contentSx?: BoxProps['sx'];
  centeredSx?: BoxProps['sx'];
  centered?: boolean;
}

const HomeLayout: React.FC<Props> = ({
  children,
  sx,
  contentSx,
  centered,
  centeredSx,
  ...rest
}) => {
  const contentWidth = 1000;
  const center = centered ? columnCenter : {};

  return (
    <Box sx={{ display: 'flex', ...sx }} {...rest}>
      <Menu width={220} />
      <Box sx={{ flexGrow: '1', minHeight: '100vh', ...center, ...contentSx }} component="main">
        {centered ? (
          <Box sx={{ p: 2, maxWidth: contentWidth, width: '100%', ...centeredSx }}>{children}</Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default HomeLayout;
