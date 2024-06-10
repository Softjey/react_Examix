import React from 'react';
import { Typography, Stack, StackProps } from '@mui/material';

interface Props extends StackProps {
  name: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
}

const SettingsOption: React.FC<Props> = ({ name, description, action, ...rest }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" {...rest}>
      <Stack>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="caption" color={(theme) => theme.palette.text.secondary}>
          {description}
        </Typography>
      </Stack>

      <Stack>{action}</Stack>
    </Stack>
  );
};

export default SettingsOption;
