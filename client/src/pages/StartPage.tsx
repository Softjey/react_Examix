import { Stack } from '@mui/material';
import StartLayout from '../components/layouts/StartLayout';
import MainButton from '../components/UI/buttons/MainButton';
import Routes from '../services/Router/Routes';

const StartPage: React.FC = () => (
  <StartLayout>
    <Stack direction="column" spacing={2}>
      <MainButton to={Routes.LOGIN} variant="contained">
        Login as teacher
      </MainButton>
      <MainButton to={Routes.JOIN} variant="contained">
        Join the test
      </MainButton>
    </Stack>
  </StartLayout>
);

export default StartPage;
