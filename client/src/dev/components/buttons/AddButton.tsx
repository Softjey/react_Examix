import { IconButton, IconButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton size="small" onClick={props.onClick} {...props}>
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
