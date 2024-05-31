import React from 'react';
import { List, ListProps } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { items } from './items';
import LinkListOption from '../../UI/LinkListOption';

interface Props extends ListProps {}

const MenuList: React.FC<Props> = ({ sx, ...rest }) => {
  return (
    <List sx={{ display: 'flex', flexDirection: 'column', ...sx }} {...rest}>
      <ClassNames>
        {({ css }) => {
          const activeLink = css({ backgroundColor: 'rgba(0, 0, 0, 0.08)' });

          return items.map(({ text, icon, url }) => (
            <LinkListOption
              key={text}
              to={url}
              icon={icon}
              title={text}
              linkProps={{ activeClassnames: [activeLink] }}
            />
          ));
        }}
      </ClassNames>
    </List>
  );
};

export default MenuList;
