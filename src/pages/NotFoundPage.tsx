import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import Layout from '../Layout';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <h1 css={{ fontSize: '6.25rem' }}>404</h1>
      <h2 css={{ marginBottom: '20px' }}>Page Not Found</h2>
      <Button onClick={() => navigate('/')} variant="contained" size="large">
        Go Home
      </Button>
    </Layout>
  );
};

export default NotFoundPage;
