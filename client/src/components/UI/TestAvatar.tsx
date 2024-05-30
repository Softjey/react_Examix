import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';
import generateColorsPair from '../../utils/generateColorsPair';
import { Test } from '../../types/api/entities/test';
import { center } from '../../styles/flex';
import getSubjectImgPath from '../../utils/getSubjectImgPath';
import Logo from './Logo';

interface Props extends AvatarProps {
  test: Pick<Test, 'image' | 'name' | 'subject' | 'createdAt'>;
  width?: number | string;
}

const TestAvatar: React.FC<Props> = ({ test, width = 60, sx, ...rest }) => {
  const { image, name, createdAt, subject } = test;
  const [bgcolor, textColor] = generateColorsPair(`${name}--${createdAt}`);
  const aspectRatio = 3 / 4;
  const w = typeof width === 'number' ? `${width}px` : width;
  const fontSize = typeof width === 'number' ? width / 4.5 : 'calc(100% * 2)';

  return (
    <Avatar
      variant="rounded"
      sx={{
        position: 'relative',
        width,
        height: 0,
        paddingBottom: `calc(${w} * ${aspectRatio})`,
        bgcolor,
        color: textColor,
        ...sx,
      }}
      {...rest}
    >
      {image && (
        <img
          src={image}
          alt={name}
          css={{
            top: 0,
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      {!image && subject && (
        <img
          src={getSubjectImgPath(subject)}
          alt={name}
          css={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40%',
            aspectRatio: '1 / 1',
          }}
        />
      )}
      {!image && !subject && (
        <Logo
          sx={{
            position: 'absolute',
            top: 0,
            ...center,
            height: '100%',
            width: '100%',
            fontSize,
          }}
        />
      )}
    </Avatar>
  );
};

export default TestAvatar;
