import { Alert, Box, IconButton, Stack, TextField, TextFieldProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MainButton from '../UI/buttons/MainButton';
import { columnCenter } from '../../styles/flex';
import LoadingButton from '../UI/buttons/LoadingButton';
import { Nullable } from '../../types/utils/Nullable';

interface Props {
  errorMessage: Nullable<string>;
  isLoading: boolean;
  onErrorClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  firstFieldProps: TextFieldProps;
  secondFieldProps: TextFieldProps;
  submitButtonText: string;
}

const LoginForm: React.FC<Props> = ({
  errorMessage,
  onErrorClose,
  onSubmit,
  isLoading,
  firstFieldProps,
  secondFieldProps,
  submitButtonText,
}) => {
  return (
    <Box component="form" noValidate sx={{ gap: '20px', ...columnCenter }} onSubmit={onSubmit}>
      <Stack width="300px" direction="column" spacing={2}>
        <TextField disabled={isLoading} fullWidth variant="outlined" {...firstFieldProps} />
        <TextField disabled={isLoading} fullWidth variant="outlined" {...secondFieldProps} />
      </Stack>
      <LoadingButton
        buttonBase={MainButton}
        loading={isLoading}
        disableElevation
        variant="contained"
        type="submit"
      >
        {submitButtonText}
      </LoadingButton>
      {errorMessage && (
        <Alert
          severity="error"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={onErrorClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default LoginForm;
