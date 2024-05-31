import React from 'react';
import { observer } from 'mobx-react-lite';
import { List, ListProps } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { getItems } from './items';
import LinkListOption from '../../UI/LinkListOption';
import teacherExamStore from '../../../store/ExamStore/TeacherExamStore';

interface Props extends ListProps {}

const MenuList: React.FC<Props> = observer(({ sx, ...rest }) => {
  const items = getItems({ ongoingExam: teacherExamStore.status !== 'idle' });

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
});

export default MenuList;
