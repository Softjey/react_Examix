import { Stack, TextField } from '@mui/material';
import StartLayout from '../../components/Layout';
import MainButton from '../../components/UI/buttons/MainButton';
import { Role, useLoginPage } from './useLoginPage';
import { columnCenter } from '../../styles/flex';
import useLogin from '../../hooks/queries/useLogin';

interface Props {
  role: Role;
}

const LoginPage: React.FC<Props> = ({ role }) => {
  const { fields, inputProps, input1Ref, input2Ref } = useLoginPage(role);
  const loginMutation = useLogin();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (input1Ref.current && input2Ref.current) {
      if (role === 'teacher') {
        const email = input1Ref.current.value;
        const password = input2Ref.current.value;

        loginMutation.mutate(
          { email, password },
          {
            // TODO: Add error handling
            onError: (error) => {
              // eslint-disable-next-line no-console
              console.log('error auth', error);
            },
          },
        );
      }
    }
  }

  return (
    <StartLayout backBtn>
      <form css={{ gap: '20px', ...columnCenter }} onSubmit={onSubmit}>
        <Stack width="300px" direction="column" spacing={2}>
          <TextField
            label={fields.input1Label}
            placeholder={fields.input1Placeholder}
            variant="outlined"
            inputProps={inputProps.input1}
            fullWidth
            inputRef={input1Ref}
            required
          />
          <TextField
            label={fields.input2Label}
            placeholder={fields.input2Placeholder}
            type={fields.input2Type}
            variant="outlined"
            inputProps={inputProps.input2}
            autoComplete="off"
            fullWidth
            inputRef={input2Ref}
            required
          />
        </Stack>
        <MainButton variant="contained" type="submit">
          {fields.buttonText}
        </MainButton>
      </form>
    </StartLayout>
  );
};

export default LoginPage;
