import StartLayout from '../components/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';

const NotFoundPage: React.FC = () => (
  <StartLayout header={false}>
    <h1 css={{ fontSize: '6.25rem' }}>404</h1>
    <h2 css={{ marginBottom: '20px' }}>Page Not Found</h2>
    <Button to={Routes.START_PAGE} variant="contained" size="large">
      Home
    </Button>
  </StartLayout>
);

export default NotFoundPage;
