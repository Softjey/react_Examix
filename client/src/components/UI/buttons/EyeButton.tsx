import { IconButtonProps, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface Props extends IconButtonProps {
  isEyeClosed: boolean;
}

const EyeButton: React.FC<Props> = ({ isEyeClosed, ...rest }) => {
  return <IconButton {...rest}>{isEyeClosed ? <VisibilityOff /> : <Visibility />}</IconButton>;
};

export default EyeButton;
