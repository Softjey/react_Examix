import { Stack } from '@mui/material';
import Routes from '../constants/Router/Routes';
import StartLayout from '../Layout';
import MainButton from '../components/UI/buttons/MainButton';

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
