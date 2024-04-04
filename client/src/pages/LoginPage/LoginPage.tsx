import { Stack, TextField } from '@mui/material';
import StartLayout from '../../Layout';
import MainButton from '../../components/UI/buttons/MainButton';
import { Role, useLoginPage } from './useLoginPage';
import { columnCenter } from '../../styles/flex';

interface Props {
  role: Role;
}

const LoginPage: React.FC<Props> = ({ role }) => {
  const { fields, inputProps } = useLoginPage(role);

  return (
    <StartLayout backBtn>
      <form css={{ gap: '20px', ...columnCenter }}>
        <Stack width="300px" direction="column" spacing={2}>
          <TextField
            label={fields.input1Label}
            placeholder={fields.input1Placeholder}
            variant="outlined"
            inputProps={inputProps.input1}
            fullWidth
          />
          <TextField
            label={fields.input2Label}
            placeholder={fields.input2Placeholder}
            type={fields.input2Type}
            variant="outlined"
            inputProps={inputProps.input2}
            autoComplete="off"
            fullWidth
          />
        </Stack>
        <MainButton variant="contained">{fields.buttonText}</MainButton>
      </form>
    </StartLayout>
  );
};

export default LoginPage;
