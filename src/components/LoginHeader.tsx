import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavigateFunction } from 'react-router';

interface Props {
  navigate: NavigateFunction;
}

// eslint-disable-next-line react/prop-types
const LoginHeader: React.FC<Props> = ({ navigate }) => (
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
        left: '-70px',
      }}
    >
      <ArrowBackIcon />
    </Fab>
  </header>
);

export default LoginHeader;
