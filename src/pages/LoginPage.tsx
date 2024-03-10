import { useNavigate } from 'react-router';
import { TextField } from '@mui/material';
import Layout from '../Layout';
import MainButton from '../components/MainButton';
import LoginHeader from '../components/LoginHeader';
import InputContainer from '../components/InputContainer';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div
        css={{
          height: '300px',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <LoginHeader navigate={navigate} />
        <form
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <InputContainer>
            <TextField label="Username" placeholder="Enter username" variant="outlined" />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              variant="outlined"
            />
          </InputContainer>
          <MainButton variant="contained">Login</MainButton>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
