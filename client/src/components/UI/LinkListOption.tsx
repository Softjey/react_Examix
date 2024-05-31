import { ListItem, ListItemButton } from '@mui/material';
import { ListItemIcon, ListItemProps, ListItemText } from '@mui/material';
import { NavigateOptions, To, useNavigate } from 'react-router';
import React, { ReactNode } from 'react';
import Link, { Props as LinkProps } from './Link';

interface Props extends ListItemProps {
  to?: To;
  navigateOptions?: NavigateOptions;
  icon: React.ReactNode;
  title: string;
  subtitle?: string | ReactNode;
  linkProps?: Omit<LinkProps, 'to'>;
}

const LinkListOption: React.FC<Props> = (props) => {
  const { title, subtitle, icon, to, navigateOptions, linkProps, onClick, ...rest } = props;
  const navigate = useNavigate();
  const linkStyle = linkProps?.style;
  const content = (
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        secondary={subtitle}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
    </ListItemButton>
  );

  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (navigateOptions && to) {
      navigate(to, navigateOptions);
    }
    onClick?.(event);
  };

  return (
    <ListItem disablePadding onClick={handleClick} {...rest}>
      {to ? (
        <Link to={to} style={{ width: '100%', ...linkStyle }} {...linkProps}>
          {content}
        </Link>
      ) : (
        content
      )}
    </ListItem>
  );
};

export default LinkListOption;
