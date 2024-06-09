import { IconButton, IconButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props extends IconButtonProps {
  iconProps?: React.ComponentProps<typeof AddIcon>;
}

const AddButton: React.FC<Props> = ({ iconProps, ...props }) => {
  return (
    <IconButton aria-label="add" {...props}>
      <AddIcon component="svg" {...iconProps} />
    </IconButton>
  );
};

export default AddButton;
