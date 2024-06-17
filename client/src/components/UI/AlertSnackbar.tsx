import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';
import React from 'react';

interface Props extends Omit<SnackbarProps, 'children'> {
  onClose: () => void;
  children: AlertProps['children'];
  severity?: AlertProps['severity'];
  variant?: AlertProps['variant'];
  alertProps?: AlertProps;
}

const getDefaultAnchorOrigin = (
  severity: AlertProps['severity'],
): SnackbarProps['anchorOrigin'] => {
  switch (severity) {
    case 'error':
    case 'warning':
      return { vertical: 'top', horizontal: 'right' };
    default:
      return { vertical: 'bottom', horizontal: 'left' };
  }
};

const getDefaultVariant = (severity: AlertProps['severity']) => {
  switch (severity) {
    case 'error':
    case 'warning':
      return 'filled';
    default:
      return undefined;
  }
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
  variant = getDefaultVariant(severity),
  anchorOrigin = getDefaultAnchorOrigin(severity),
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
