import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type To = { to: RouterLinkProps['to'] };

export const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & To>(
  (props, ref) => <RouterLink ref={ref} {...props} role={undefined} />,
);

const Button: React.FC<MuiButtonProps & Partial<To>> = (props) => {
  if ('to' in props && props.to !== undefined) {
    return <MuiButton disableElevation component={LinkBehavior} {...props} />;
  }

  return <MuiButton disableElevation {...props} />;
};

export default Button;
