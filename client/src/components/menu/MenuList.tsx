import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { items } from './items';

interface Props extends ListProps {}

const MenuList: React.FC<Props> = ({ sx, ...rest }) => {
  return (
    <List sx={{ display: 'flex', flexDirection: 'column', ...sx }} {...rest}>
      {items.map(({ text, icon, url }) => (
        <ListItem key={text} disablePadding>
          <Link to={url} css={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
