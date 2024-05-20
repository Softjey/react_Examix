import { Avatar, AvatarProps } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';

interface Props extends AvatarProps {
  image?: string;
  name?: string;
  width?: number;
}

const TestAvatar: React.FC<Props> = ({ image, width = 60, name, sx, ...rest }) => {
  const aspectRatio = 4 / 3;
  const height = width / aspectRatio;

  return (
    <Avatar variant="rounded" sx={{ width, height, ...sx }} {...rest}>
      {image ? (
        <img src={image} alt={name} width={width} height={height} />
      ) : (
        <ImageIcon sx={{ width: height / 1.5, height: height / 1.5 }} />
      )}
    </Avatar>
  );
};

export default TestAvatar;
