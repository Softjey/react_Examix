import React from 'react';
import { ButtonProps, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from './Button';
import useLogout from '../../../hooks/queries/useLogout';

interface Props extends ButtonProps {}

const LogoutButton: React.FC<Props> = ({ ...rest }) => {
  const logout = useLogout();

  return (
    <Button
      variant="outlined"
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
      endIcon={logout.isPending ? <CircularProgress size="20px" /> : <LogoutIcon />}
      {...rest}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
