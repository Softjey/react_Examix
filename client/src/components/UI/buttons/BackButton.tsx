import { Fab, FabProps } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props extends FabProps {}

const BackButton: React.FC<Props> = memo(({ ...rest }) => {
  const navigate = useNavigate();

  return (
    <Fab onClick={() => navigate(-1)} color="primary" size="large" {...rest}>
      <ArrowBackIcon />
    </Fab>
  );
});

export default BackButton;
