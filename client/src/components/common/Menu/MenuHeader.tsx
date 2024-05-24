import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Link, LinkProps } from 'react-router-dom';
import { trim } from '../../../utils/trim';
import Routes from '../../../services/Router/Routes';
import useAuth from '../../../hooks/queries/useAuth';
import getInitials from '../../../utils/getInitials';
import generateColorsPair from '../../../utils/generateColorsPair';

interface Props extends Omit<LinkProps, 'to'> {}

const MenuHeader: React.FC<Props> = ({ ...rest }) => {
  const { data: user, isPending, isError } = useAuth();
  const isLoading = isPending || !user;
  const name = isLoading ? 'Loading...' : trim(user.name, 16);
  const email = isLoading ? 'Loading...' : trim(user.email, 20);
  const notSuccess = isLoading || isError;
  const [bgcolor, textColor] = generateColorsPair(`${user?.name}--${user?.createdAt}`);
  const initials = getInitials(name);

  return (
    <Link
      to={Routes.HOME}
      css={{
        display: 'flex',
        padding: '10px',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
        textDecoration: 'none',
        color: 'inherit',
      }}
      {...rest}
    >
      <Avatar sx={{ bgcolor, color: textColor }}>
        {notSuccess && <ImageIcon fontSize="small" />}
        {!notSuccess && user.photo && (
          <img src={user.photo} alt={`${user.name} avatar`} css={{ maxWidth: '100%' }} />
        )}
        {!notSuccess && !user.photo && <Typography>{initials}</Typography>}
      </Avatar>

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
