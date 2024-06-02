import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';
import { trim } from '../../../utils/trim';
import Routes from '../../../services/Router/Routes';
import useAuth from '../../../hooks/queries/useAuth';
import UserAvatar from '../../UI/UserAvatar';

interface Props extends Omit<LinkProps, 'to'> {}

const MenuHeader: React.FC<Props> = ({ ...rest }) => {
  const { data: user, isPending, isError } = useAuth();
  const isLoading = isPending || !user;
  const name = isLoading ? 'Loading...' : trim(user.name, 16);
  const email = isLoading ? 'Loading...' : trim(user.email, 20);

  return (
    <Link
      to={Routes.HOME}
      css={{
        display: 'flex',
        padding: '10px',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
      }}
      {...rest}
    >
      <UserAvatar user={user} />

      <Box>
        <Typography variant="body1" color={isError ? 'red' : 'inherit'}>
          {isError ? 'Error to load name' : name}
        </Typography>
        <Typography variant="caption" color={isError ? 'red' : 'GrayText'}>
          {isError ? 'Error to load email' : email}
        </Typography>
      </Box>
    </Link>
  );
};

export default MenuHeader;
