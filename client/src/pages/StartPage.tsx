import { Stack } from '@mui/material';
import Routes from '../constants/Router/Routes';
import Layout from '../Layout';
import MainButton from '../components/UI/buttons/MainButton';
import Header from '../components/Header';

const StartPage: React.FC = () => (
  <Layout>
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
        height: '300px',
      }}
    >
      <Header disableBackBtn />
      <Stack direction="column" spacing={2}>
        <MainButton to={Routes.LOGIN_PAGE} variant="contained">
          Login as teacher
        </MainButton>
        <MainButton to={Routes.JOIN_PAGE} variant="contained">
          Join the test
        </MainButton>
      </Stack>
    </div>
  </Layout>
);

export default StartPage;
