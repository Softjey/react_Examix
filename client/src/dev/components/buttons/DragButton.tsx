import { IconButtonProps, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const DragButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton aria-label="close" color="inherit" onClick={props.onClick} {...props}>
      <DragIndicatorIcon />
    </IconButton>
  );
};

export default DragButton;
