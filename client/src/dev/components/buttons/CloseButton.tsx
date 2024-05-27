import { IconButtonProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props extends IconButtonProps {
  iconProps?: React.ComponentProps<typeof CloseIcon>;
}

const CloseButton: React.FC<Props> = ({ iconProps, ...props }) => {
  return (
    <IconButton aria-label="close" {...props}>
      <CloseIcon {...iconProps} />
    </IconButton>
  );
};

export default CloseButton;
