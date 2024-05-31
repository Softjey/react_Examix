import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface Props extends TypographyProps {}

const Logo: React.FC<Props> = ({ ...rest }) => (
  <Typography variant="h1" {...rest}>
    Examix
  </Typography>
);

export default Logo;
