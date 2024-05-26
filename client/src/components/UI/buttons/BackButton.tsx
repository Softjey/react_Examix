import { Fab, FabProps } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props extends FabProps {}

const BackButton: React.FC<Props> = memo(({ sx, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Fab
      sx={{ boxShadow: 'none', ...sx }}
      onClick={() => navigate(-1)}
      color="primary"
      size="large"
      {...rest}
    >
      <ArrowBackIcon />
    </Fab>
  );
});

export default BackButton;
