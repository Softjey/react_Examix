import MainButton from '../components/MainButton';
import Layout from '../Layout';
import Routes from '../Routes';

const StartPage: React.FC = () => (
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
        <MainButton href={Routes.LOGIN_PAGE} variant="contained">
          Login as teacher
        </MainButton>
        <MainButton href={Routes.JOIN_PAGE} variant="contained">
          Join the test
        </MainButton>
      </div>
    </div>
  </Layout>
);

export default StartPage;
