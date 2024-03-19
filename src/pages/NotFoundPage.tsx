import { Button } from '@mui/material';
import Layout from '../Layout';
import Routes from '../Routes';

const NotFoundPage: React.FC = () => (
  <Layout>
    <h1 css={{ fontSize: '6.25rem' }}>404</h1>
    <h2 css={{ marginBottom: '20px' }}>Page Not Found</h2>
    <Button href={Routes.START_PAGE} variant="contained" size="large">
      Go Home
    </Button>
  </Layout>
);

export default NotFoundPage;
