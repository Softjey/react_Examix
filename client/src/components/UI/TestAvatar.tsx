import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';
import generateColorsPair from '../../utils/generateColorsPair';
import { Test } from '../../types/api/entities/test';
import { center } from '../../styles/flex';
import getSubjectImgPath from '../../utils/getSubjectImgPath';
import Logo from './Logo';

interface BaseProps extends AvatarProps {
  test: Pick<Test, 'image' | 'name' | 'subject' | 'createdAt'>;
}

type NumberProps = { width: number } & BaseProps;
type StringProps = { width: string; logoFontSize: string | number } & BaseProps;
type Props = NumberProps | StringProps;

const isStringProps = (props: Props): props is StringProps => {
  return typeof props.width === 'string';
};

const TestAvatar: React.FC<Props> = (props) => {
  const { test, width = 60, sx, ...rest } = props;
  const { image, name, createdAt, subject } = test;
  const [bgcolor, textColor] = generateColorsPair(`${name}--${createdAt}`);
  const aspectRatio = 3 / 4;
  const w = isStringProps(props) ? props.width : `${props.width}px`;
  const fontSize = isStringProps(props) ? props.logoFontSize : `${props.width / 4.5}px`;

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
