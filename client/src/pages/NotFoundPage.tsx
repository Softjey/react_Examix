import { Typography } from '@mui/material';
import StartLayout from '../components/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';

const NotFoundPage: React.FC = () => (
  <StartLayout header={false}>
    <Typography fontWeight={700} variant="h1">
      404
    </Typography>
    <Typography fontWeight={600} variant="h2">
      Page Not Found
    </Typography>
    <Button to={Routes.START_PAGE} variant="contained" size="large">
      Home
    </Button>
  </StartLayout>
);

export default NotFoundPage;
