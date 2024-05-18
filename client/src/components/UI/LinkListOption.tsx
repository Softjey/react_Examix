import { ListItem, ListItemButton } from '@mui/material';
import { ListItemIcon, ListItemProps, ListItemText } from '@mui/material';
import React from 'react';
import Link, { Props as LinkProps } from './Link';

interface Props extends ListItemProps {
  to: LinkProps['to'];
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  linkProps?: Omit<LinkProps, 'to'>;
}

const LinkListOption: React.FC<Props> = ({ title, subtitle, icon, to, linkProps, ...rest }) => {
  const linkStyle = linkProps?.style;

  return (
    <ListItem disablePadding {...rest}>
      <Link
        to={to}
        style={{ textDecoration: 'none', color: 'inherit', width: '100%', ...linkStyle }}
        {...linkProps}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} secondary={subtitle} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default LinkListOption;
