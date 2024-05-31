import { Stack, TextField, TextFieldProps } from '@mui/material';
import StartLayout from '../../components/layouts/StartLayout';
import MainButton from '../../components/UI/buttons/MainButton';
import { columnCenter } from '../../styles/flex';

interface Props {
  onSubmit: (event: React.FormEvent) => void;
  firstFieldProps: TextFieldProps;
  secondFieldProps: TextFieldProps;
  submitButtonText: string;
}

const LoginPage: React.FC<Props> = ({
  onSubmit,
  firstFieldProps,
  secondFieldProps,
  submitButtonText,
}) => (
  <StartLayout backBtn>
    <form css={{ gap: '20px', ...columnCenter }} onSubmit={onSubmit}>
      <Stack width="300px" direction="column" spacing={2}>
        <TextField {...firstFieldProps} />
        <TextField {...secondFieldProps} />
      </Stack>
      <MainButton disableElevation variant="contained" type="submit">
        {submitButtonText}
      </MainButton>
    </form>
  </StartLayout>
);

export default LoginPage;
