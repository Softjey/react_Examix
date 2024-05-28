import { Box, Stack, TextField, TextFieldProps } from '@mui/material';
import MainButton from '../../components/UI/buttons/MainButton';

import { columnCenter } from '../../styles/flex';
import StartLayout from '../../components/layouts/StartLayout';
import LoadingButton from '../../components/UI/buttons/LoadingButton';

export type LoginForm<FirstField extends string, SecondField extends string> = {
  [K in FirstField | SecondField]: string;
};

interface Props {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  firstFieldProps: TextFieldProps;
  secondFieldProps: TextFieldProps;
  submitButtonText: string;
}

const LoginPage: React.FC<Props> = ({
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
      </Box>
    </StartLayout>
  );
};

export default LoginPage;
