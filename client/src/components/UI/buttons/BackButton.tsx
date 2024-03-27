import { Fab } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC = memo(() => {
  const navigate = useNavigate();

  return (
    <Fab
      onClick={() => navigate(-1)}
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
  );
});

export default BackButton;
