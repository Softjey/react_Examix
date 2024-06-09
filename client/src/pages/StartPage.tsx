import { Stack } from '@mui/material';
import Routes from '../services/Router/Routes';
import StartLayout from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';

const StartPage: React.FC = () => (
  <StartLayout>
    <Stack direction="column" width={200} spacing={2}>
      <Button size="large" to={Routes.LOGIN} variant="contained">
        Login as teacher
      </Button>
      <Button size="large" to={Routes.JOIN} variant="contained">
        Join the test
      </Button>
    </Stack>
  </StartLayout>
);

export default StartPage;
