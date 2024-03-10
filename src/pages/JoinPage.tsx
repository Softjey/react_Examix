import { useNavigate } from 'react-router';
import { Fab, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../Layout';
import MainButton from '../components/MainButton';

const JoinPage: React.FC = () => {
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
        <header css={{ position: 'relative' }}>
          <h1>Examix</h1>
          <Fab
            onClick={() => navigate('/')}
            color="primary"
            size="large"
            sx={{
              position: 'absolute',
              transform: 'translateY(-50%)',
              top: '50%',
              // is needed to center button inside header
              left: '-70px',
            }}
          >
            <ArrowBackIcon />
          </Fab>
        </header>
        <form
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '15px',
              width: '300px',
            }}
          >
            <TextField label="Name" placeholder="Enter name" variant="outlined" />
            <TextField
              inputProps={{ maxLength: 6 }}
              label="Code"
              placeholder="Enter game code"
              variant="outlined"
            />
          </div>
          <MainButton variant="contained">Join the test</MainButton>
        </form>
      </div>
    </Layout>
  );
};

export default JoinPage;
