import { IconButtonProps, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface Props extends IconButtonProps {
  showPassword: boolean;
}

const PasswordEyeButton: React.FC<Props> = ({ showPassword, ...rest }) => {
  return (
    <IconButton aria-label="toggle password visibility" {...rest}>
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
};

export default PasswordEyeButton;
