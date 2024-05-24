import { ListItem, Box, ListItemAvatar } from '@mui/material';
import { ListItemText, ListItemProps, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import prettifyDate from '../../utils/prettifyDate';
import { Exam } from '../../types/api/exam';
import Routes from '../../services/Router/Routes';
import { trim } from '../../utils/trim';
import TestAvatar from './TestAvatar';
import SubjectItem from './SubjectItem';

interface Props extends ListItemProps {
  exam: Exam;
}

const ExamItem: React.FC<Props> = ({ exam, ...rest }) => {
  const { id, createdAt, test, results } = exam;
  const { name, subject } = test;
  const studentsStr = trim(results.map((student) => student.studentName).join(', '), 100);

  return (
    <ListItem {...rest}>
      <Link
        to={`${Routes.EXAM}/${id}`}
        css={{
          width: '100%',
          display: 'flex',
          userSelect: 'none',
          textDecoration: 'none',
          color: 'inherit',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" width="40%">
          <ListItemAvatar>
            <TestAvatar test={test} sx={{ mr: '20px' }} />
          </ListItemAvatar>

          <ListItemText
            primary={name}
            primaryTypographyProps={{ variant: 'subtitle2' }}
            secondary={<SubjectItem subject={subject} />}
          />
        </Box>

        <Typography variant="caption" color="GrayText" flexGrow={1} width="50%">
          {studentsStr}
        </Typography>

        <Typography
          variant="body2"
          color="GrayText"
          width={120}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          {prettifyDate(createdAt)}
        </Typography>
      </Link>
    </ListItem>
  );
};

export default ExamItem;
