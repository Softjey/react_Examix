import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';

interface Props extends Omit<SnackbarProps, 'children'> {
  onClose: () => void;
  children: AlertProps['children'];
}

const WarningSnackBar: React.FC<Props> = ({ children, open, onClose, ...props }) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={(_, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        onClose();
      }}
      {...props}
    >
      <Alert onClose={() => onClose} variant="filled" severity="warning">
        {children}
      </Alert>
    </Snackbar>
  );
};

export default WarningSnackBar;
