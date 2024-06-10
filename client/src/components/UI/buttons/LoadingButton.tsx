import React from 'react';
import { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Button from './Button';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, onClick, disabled, ...props }) => {
  return (
    <Button
      disabled={loading || disabled}
      onClick={onClick}
      endIcon={loading && <CircularProgress color="inherit" size={24} />}
      {...props}
    />
  );
};

export default LoadingButton;
