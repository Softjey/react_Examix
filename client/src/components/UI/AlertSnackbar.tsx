import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';
import React from 'react';

interface Props extends Omit<SnackbarProps, 'children'> {
  onClose: () => void;
  children: AlertProps['children'];
  severity?: AlertProps['severity'];
  variant?: AlertProps['variant'];
  alertProps?: AlertProps;
}

const defaultVarianAndAnchorOrigin: {
  [key: string]: {
    variant: AlertProps['variant'];
    anchorOrigin: SnackbarProps['anchorOrigin'];
  };
} = {
  error: {
    variant: 'filled',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
  },
  warning: {
    variant: 'filled',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
  },
  info: {
    variant: undefined,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  },
  success: {
    variant: undefined,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  },
};

const getFilledErrorSx = (variant: AlertProps['variant'], severity: AlertProps['severity']) => {
  if (variant === 'filled' && severity === 'error') {
    return {
      backgroundColor: '#F55555',
    };
  }
  return {};
};

const AlertSnackbar: React.FC<Props> = ({
  children,
  open,
  onClose,
  autoHideDuration = 3000,
  severity = 'info',
  variant = defaultVarianAndAnchorOrigin[severity].variant,
  anchorOrigin = defaultVarianAndAnchorOrigin[severity].anchorOrigin,
  alertProps: { sx: alertSx, ...alertProps } = {},
  ...props
}) => {
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      {...props}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant={variant}
        sx={{ ...getFilledErrorSx(variant, severity), ...alertSx }}
        {...alertProps}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
