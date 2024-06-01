import React from 'react';
import { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  buttonBase: React.FC<ButtonProps>;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  buttonBase,
  loading,
  onClick,
  children,
  ...props
}) => {
  const StyledButton = styled(buttonBase)(() => ({
    position: 'relative',
    '& .MuiCircularProgress-root': {
      position: 'absolute',
    },
  }));
  return (
    <StyledButton disabled={loading} onClick={onClick} sx={{ display: 'flex' }} {...props}>
      {loading ? <CircularProgress color="inherit" size={24} /> : children}
    </StyledButton>
  );
};

export default LoadingButton;
