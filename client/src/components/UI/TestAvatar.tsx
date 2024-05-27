import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';
import generateColorsPair from '../../utils/generateColorsPair';
import { Test } from '../../types/api/entities/test';
import { center } from '../../styles/flex';
import getSubjectImgPath from '../../utils/getSubjectImgPath';
import Logo from './Logo';

interface Props extends AvatarProps {
  test: Pick<Test, 'image' | 'name' | 'subject' | 'createdAt'>;
  width?: number;
}

const TestAvatar: React.FC<Props> = ({ test, width = 60, sx, ...rest }) => {
  const { image, name, createdAt, subject } = test;
  const aspectRatio = 4 / 3;
  const height = width / aspectRatio;
  const [bgcolor, textColor] = generateColorsPair(`${name}--${createdAt}`);

  return (
    <Avatar variant="rounded" sx={{ width, height, bgcolor, color: textColor, ...sx }} {...rest}>
      {image && <img src={image} alt={name} width={width} height={height} />}
      {!image && subject && (
        <img src={getSubjectImgPath(subject)} alt={name} width={width / 2} height={height / 2} />
      )}
      {!image && !subject && (
        <Logo
          sx={{
            ...center,
            height: '100%',
            width: '100%',
            fontSize: `${width / 4.5}px`,
          }}
        />
      )}
    </Avatar>
  );
};

export default TestAvatar;
