import { Box, Stack, TextField, TextFieldProps } from '@mui/material';
import MainButton from '../UI/buttons/MainButton';
import { columnCenter } from '../../styles/flex';
import LoadingButton from '../UI/buttons/LoadingButton';
import { Nullable } from '../../types/utils/Nullable';
import ErrorSnackBar from '../UI/errors/ErrorSnackBar';

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
      <ErrorSnackBar errorMessage={errorMessage!} open={!!errorMessage} onClose={onErrorClose} />
    </Box>
  );
};

export default LoginForm;
