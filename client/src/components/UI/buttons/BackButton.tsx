import { Fab } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  style?: React.CSSProperties;
}

const BackButton: React.FC<Props> = memo(({ style }) => {
  const navigate = useNavigate();

  return (
    <Fab onClick={() => navigate(-1)} color="primary" size="large" sx={style}>
      <ArrowBackIcon />
    </Fab>
  );
});

export default BackButton;
