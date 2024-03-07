import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout style={{ gap: '25px', transform: 'translateY(-5%)' }}>
      <h1>Examix</h1>
      <div css={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Button
          onClick={() => navigate('/login')}
          css={{ width: '200px', height: '50px', fontSize: '1rem' }}
          variant="contained"
        >
          Login as teacher
        </Button>
        <Button
          onClick={() => navigate('/join')}
          css={{ width: '200px', height: '50px', fontSize: '1rem' }}
          variant="contained"
        >
          Login as student
        </Button>
      </div>
    </Layout>
  );
};

export default StartPage;
