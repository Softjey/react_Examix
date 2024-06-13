import { Alert, Snackbar, SnackbarProps } from '@mui/material';

interface Props extends SnackbarProps {
  warningMessage?: string;
  onClose: () => void;
}

const WarningSnackBar: React.FC<Props> = ({
  children: _,
  open,
  onClose,
  warningMessage,
  ...props
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={(__, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        onClose();
      }}
      {...props}
    >
      <Alert onClose={() => onClose} variant="filled" severity="warning">
        {warningMessage}
      </Alert>
    </Snackbar>
  );
};

export default WarningSnackBar;
