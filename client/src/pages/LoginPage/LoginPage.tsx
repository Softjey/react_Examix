import { Box, Stack, TextField, TextFieldProps } from '@mui/material';
import MainButton from '../../components/UI/buttons/MainButton';
import { columnCenter } from '../../styles/flex';
import StartLayout from '../../components/layouts/StartLayout';

export type LoginForm<FirstField extends string, SecondField extends string> = {
  [K in FirstField | SecondField]: string;
};

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  firstFieldProps: TextFieldProps;
  secondFieldProps: TextFieldProps;
  submitButtonText: string;
}

const LoginPage: React.FC<Props> = ({
  onSubmit,
  firstFieldProps,
  secondFieldProps,
  submitButtonText,
}) => {
  return (
    <StartLayout backBtn>
      <Box component="form" noValidate sx={{ gap: '20px', ...columnCenter }} onSubmit={onSubmit}>
        <Stack width="300px" direction="column" spacing={2}>
          <TextField {...firstFieldProps} />
          <TextField {...secondFieldProps} />
        </Stack>
        <MainButton disableElevation variant="contained" type="submit">
          {submitButtonText}
        </MainButton>
      </Box>
    </StartLayout>
  );
};

export default LoginPage;
