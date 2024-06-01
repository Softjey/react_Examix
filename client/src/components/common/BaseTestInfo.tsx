import React from 'react';
import dayjs from 'dayjs';
import { Stack, Typography, Box, StackProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import SubjectItem from '../UI/SubjectItem/SubjectItem';
import TestAvatar from '../UI/TestAvatar';
import { DetailedTest } from '../../types/api/entities/detailedTest';
import UserAvatar from '../UI/UserAvatar';
import teacherExamStore from '../../store/ExamStore/TeacherExamStore';
import Button from '../UI/buttons/Button';

interface Props extends StackProps {
  test: DetailedTest;
  button?: React.ReactNode;
}

const BaseTestInfo: React.FC<Props> = observer(({ sx, test, button, ...rest }) => {
  const { id, name, description, subject, createdAt } = test;
  const date = dayjs(createdAt).format('DD/MM/YYYY');

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ gap: 6, p: 2, ...sx }}
      component="section"
      {...rest}
    >
      <Stack justifyContent="space-between" spacing={2}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <UserAvatar user={test.author} />

            <Typography variant="body2">{test.author.name}</Typography>
          </Stack>

          <Typography variant="h4">{name}</Typography>

          <Typography variant="body1" fontWeight={300} paragraph>
            {description}
          </Typography>
        </Stack>

        <Typography variant="caption" color="textSecondary">
          This test was created at {date}
        </Typography>
      </Stack>

      <Stack spacing={2} overflow="visible">
        <Box position="relative">
          <TestAvatar width={300} test={test} />
          <SubjectItem
            variant="chip"
            textVariant="caption"
            chipVariant="outlined"
            subject={subject}
            sx={{ position: 'absolute', bottom: 10, left: 10, userSelect: 'none' }}
          />
        </Box>

        {button ?? (
          <Button
            variant="contained"
            color="secondary"
            disabled={teacherExamStore.status !== 'idle'}
            onClick={() => teacherExamStore.createExam(id)}
          >
            {teacherExamStore.status !== 'idle'
              ? 'You have already started the exam'
              : 'Create Exam with this Test'}
          </Button>
        )}
      </Stack>
    </Stack>
  );
});

export default BaseTestInfo;
