import { Stack } from '@mui/material';
import StartLayout from '../components/Layout';
import MainButton from '../components/UI/buttons/MainButton';
import Routes from '../services/Router/Routes';

const StartPage: React.FC = () => (
  <StartLayout>
    <Stack direction="column" spacing={2}>
      <MainButton to={Routes.LOGIN_PAGE} variant="contained">
        Login as teacher
      </MainButton>
      <MainButton to={Routes.JOIN_PAGE} variant="contained">
        Join the test
      </MainButton>
    </Stack>
  </StartLayout>
);

export default StartPage;
