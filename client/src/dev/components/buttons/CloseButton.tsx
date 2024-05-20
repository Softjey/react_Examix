import { IconButtonProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton size="small" aria-label="close" color="inherit" onClick={props.onClick} {...props}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default CloseButton;
