import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemProps,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

interface Props extends ListItemProps {}

const MenuHeader: React.FC<Props> = ({ ...rest }) => {
  return (
    <ListItem {...rest}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="John Doe"
        secondary={<Typography variant="caption">some.mail@gmail.com</Typography>}
      />
    </ListItem>
  );
};

export default MenuHeader;
