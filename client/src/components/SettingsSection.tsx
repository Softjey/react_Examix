import { Stack, Typography, Divider, StackProps, TypographyProps } from '@mui/material';
import React from 'react';

interface Props extends StackProps {
  name: React.ReactNode;
  typographyProps?: TypographyProps;
}

const SettingsSection: React.FC<Props> = ({ name, typographyProps, children, ...rest }) => {
  return (
    <Stack spacing={1} component="article" {...rest}>
      <Typography variant="h6" {...typographyProps}>
        {name}
      </Typography>
      <Divider />
      {children}
    </Stack>
  );
};

export default SettingsSection;
