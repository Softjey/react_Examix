import { Alert, Box, IconButton, Stack, TextField, TextFieldProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosResponse } from 'axios';
import MainButton from '../../components/UI/buttons/MainButton';
import { columnCenter } from '../../styles/flex';
import StartLayout from '../../components/layouts/StartLayout';
import LoadingButton from '../../components/UI/buttons/LoadingButton';
import { Nullable } from '../../types/utils/Nullable';

interface Props {
  error: Nullable<AxiosResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: React.Dispatch<React.SetStateAction<Nullable<AxiosResponse<any, any>>>>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  firstFieldProps: TextFieldProps;
  secondFieldProps: TextFieldProps;
  submitButtonText: string;
}

const LoginPage: React.FC<Props> = ({
  error,
  setError,
  onSubmit,
  isLoading,
  firstFieldProps,
  secondFieldProps,
  submitButtonText,
}) => {
  return (
    <StartLayout backBtn>
      <Box component="form" noValidate sx={{ gap: '20px', ...columnCenter }} onSubmit={onSubmit}>
        <Stack width="300px" direction="column" spacing={2}>
          <TextField disabled={isLoading} {...firstFieldProps} />
          <TextField disabled={isLoading} {...secondFieldProps} />
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
        {error && (
          <Alert
            severity="error"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setError(null)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {error.data.statusCode === 401 ? 'Wrong email or password' : 'Server error'}
          </Alert>
        )}
      </Box>
    </StartLayout>
  );
};

export default LoginPage;
