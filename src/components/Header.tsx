import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  disableBackBtn?: boolean;
}

const Header: React.FC<Props> = ({ disableBackBtn }) => (
  <header css={{ position: 'relative' }}>
    <h1>Examix</h1>
    {!disableBackBtn && (
      <Fab
        href=".."
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
    )}
  </header>
);

export default Header;
