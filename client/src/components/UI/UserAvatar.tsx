import { Avatar, AvatarProps, Typography } from '@mui/material';
import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import generateColorsPair from '../../utils/generateColorsPair';
import getInitials from '../../utils/getInitials';
import { User } from '../../types/api/entities/user';

interface Props extends AvatarProps {
  user?: Pick<User, 'name' | 'photo' | 'createdAt'>;
}

const UserAvatar: React.FC<Props> = ({ user, sx, ...rest }) => {
  const [bgcolor, textColor] = generateColorsPair(`${user?.name}--${user?.createdAt}`);
  const userWithPhoto = user && user.photo && (
    <img src={user?.photo} alt={`${user?.name} avatar`} css={{ maxWidth: '100%' }} />
  );
  const userWithoutPhoto = user && !user.photo && <Typography>{getInitials(user.name)}</Typography>;
  const userDoesNotExist = !user && <ImageIcon fontSize="small" />;

  return (
    <Avatar sx={{ bgcolor, color: textColor, ...sx }} {...rest}>
      {userWithPhoto ?? userWithoutPhoto ?? userDoesNotExist}
    </Avatar>
  );
};

export default UserAvatar;
