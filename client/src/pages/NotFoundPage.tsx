import StartLayout from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';

const NotFoundPage: React.FC = () => (
  <StartLayout>
    <h1 css={{ fontSize: '6.25rem' }}>404</h1>
    <h2 css={{ marginBottom: '20px' }}>Page Not Found</h2>
    <Button to={Routes.HOME} variant="contained" size="large">
      Go Home
    </Button>
  </StartLayout>
);

export default NotFoundPage;
