import { Stack } from '@mui/material';
import MainButton from '../components/UI/buttons/MainButton';
import Routes from '../services/Router/Routes';
import StartLayout from '../components/layouts/StartLayout';

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
