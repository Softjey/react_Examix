import { IconButton, IconButtonProps } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props extends IconButtonProps {
  iconProps?: React.ComponentProps<typeof DeleteIcon>;
}

const DeleteButton: React.FC<Props> = ({ iconProps, ...props }) => {
  return (
    <IconButton aria-label="delete" {...props}>
      <DeleteIcon component="svg" {...iconProps} />
    </IconButton>
  );
};

export default DeleteButton;
