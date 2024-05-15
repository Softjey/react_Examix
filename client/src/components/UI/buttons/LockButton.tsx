import React from 'react';
import { ButtonProps } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Button from './Button';

interface Props extends ButtonProps {}

const LockButton: React.FC<Props> = ({ ...rest }) => {
  return (
    <Button variant="contained" color="primary" {...rest}>
      <LockIcon fontSize="medium" />
    </Button>
  );
};

export default LockButton;
