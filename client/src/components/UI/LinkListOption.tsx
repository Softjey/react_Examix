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
  const linkCss = linkProps?.css;

  return (
    <ListItem disablePadding {...rest}>
      <Link
        to={to}
        css={{ textDecoration: 'none', color: 'inherit', width: '100%', ...linkCss }}
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
