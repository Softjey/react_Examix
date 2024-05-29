import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useTabs } from './TabsContext';

export interface TabPanelProps extends Omit<BoxProps, 'value'> {
  value: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, ...rest }) => {
  const { id, currentValue } = useTabs();

  return (
    <Box
      role="tabpanel"
      hidden={value !== currentValue}
      id={`tabpanel-${id}-${value}`}
      aria-labelledby={`tab-${id}-${value}`}
      {...rest}
    />
  );
};

export default TabPanel;
