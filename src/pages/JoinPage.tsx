import { useNavigate } from 'react-router';
import { Button, Fab, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../Layout';

const Inputs: React.FC = () => (
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
);

const Wrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div css={{ position: 'relative' }}>
      <h1 css={{ marginBottom: '20px' }}>Examix</h1>
      <form
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Inputs />
        <Button sx={{ width: '200px', height: '50px', fontSize: '1rem' }} variant="contained">
          Join the test
        </Button>
      </form>
      <Fab
        onClick={() => navigate('/')}
        color="primary"
        size="large"
        sx={{
          position: 'absolute',
          top: '7px',
          left: '-70px',
        }}
      >
        <ArrowBackIcon />
      </Fab>
    </div>
  );
};

const JoinPage: React.FC = () => (
  <Layout>
    <Wrapper />
  </Layout>
);

export default JoinPage;
