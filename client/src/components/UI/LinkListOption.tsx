import { ListItem, ListItemButton } from '@mui/material';
import { ListItemIcon, ListItemProps, ListItemText } from '@mui/material';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface Props extends ListItemProps {
  to: LinkProps['to'];
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

const LinkListOption: React.FC<Props> = ({ title, subtitle, icon, to, ...rest }) => {
  return (
    <ListItem disablePadding {...rest}>
      <Link to={to} css={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} secondary={subtitle} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default LinkListOption;
