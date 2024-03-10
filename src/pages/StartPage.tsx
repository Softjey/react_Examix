import { useNavigate } from 'react-router-dom';
import MainButton from '../components/MainButton';
import Layout from '../Layout';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px',
          height: '300px',
        }}
      >
        <h1>Examix</h1>
        <div css={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <MainButton onClick={() => navigate('/login')} variant="contained">
            Login as teacher
          </MainButton>
          <MainButton onClick={() => navigate('/join')} variant="contained">
            Join the test
          </MainButton>
        </div>
      </div>
    </Layout>
  );
};

export default StartPage;
