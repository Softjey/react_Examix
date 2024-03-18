import { Stack, TextField } from '@mui/material';
import Layout from '../../Layout';
import MainButton from '../../components/MainButton';
import Header from '../../components/Header';
import { Role, useLoginPage } from './useLoginPage';

interface Props {
  role: Role;
}

// eslint-disable-next-line react/prop-types
const LoginPage: React.FC<Props> = ({ role }) => {
  const { fields, inputProps, hiddenCounterStyles } = useLoginPage(role);

  return (
    <Layout>
      <div
        css={{
          height: '300px',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <form
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
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
              inputProps={{ ...inputProps.input2, sx: hiddenCounterStyles }}
              autoComplete="off"
              fullWidth
            />
          </Stack>
          <MainButton variant="contained">{fields.buttonText}</MainButton>
        </form>
      </div>
    </Layout>
  );
};
export default LoginPage;
