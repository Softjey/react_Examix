import React from 'react';
import { List, ListProps } from '@mui/material';
import { items } from './items';
import LinkListOption from '../UI/LinkListOption';

interface Props extends ListProps {}

const MenuList: React.FC<Props> = ({ sx, ...rest }) => {
  return (
    <List sx={{ display: 'flex', flexDirection: 'column', ...sx }} {...rest}>
      {items.map(({ text, icon, url }) => (
        <LinkListOption key={text} to={url} icon={icon} title={text} />
      ))}
    </List>
  );
};

export default MenuList;
