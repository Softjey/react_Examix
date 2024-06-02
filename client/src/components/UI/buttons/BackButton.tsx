import { Fab, FabProps } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props extends FabProps {
  route?: string;
}

const BackButton: React.FC<Props> = memo(({ sx, route, ...rest }) => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleRoute = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <Fab
      sx={{ boxShadow: 'none', ...sx }}
      onClick={route ? handleRoute : handleBack}
      color="primary"
      size="large"
      {...rest}
    >
      <ArrowBackIcon />
    </Fab>
  );
});

export default BackButton;
