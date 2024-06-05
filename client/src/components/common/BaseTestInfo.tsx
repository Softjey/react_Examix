import React from 'react';
import dayjs from 'dayjs';
import { Stack, Typography, Box, StackProps } from '@mui/material';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import SubjectItem from '../UI/SubjectItem/SubjectItem';
import TestAvatar from '../UI/TestAvatar';
import { DetailedTest } from '../../types/api/entities/detailedTest';
import UserAvatar from '../UI/UserAvatar';
import authorExamStore from '../../store/ExamStore/AuthorExamStore';
import Button from '../UI/buttons/Button';
import Routes from '../../services/Router/Routes';

interface Props extends StackProps {
  test: Pick<
    DetailedTest,
    'id' | 'image' | 'name' | 'description' | 'author' | 'subject' | 'createdAt'
  >;
  action?: React.ReactNode;
}

const BaseTestInfo: React.FC<Props> = observer(({ sx, test, action, ...rest }) => {
  const navigate = useNavigate();
  const { id, name, description, subject, createdAt } = test;
  const date = dayjs(createdAt).format('DD/MM/YYYY');

  const createExam = async () => {
    authorExamStore.createExam(id).then(() => {
      navigate(Routes.ONGOING_EXAM_PANEL);
    });
  };

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

        {action ?? (
          <Button
            variant="contained"
            color="secondary"
            disabled={authorExamStore.status !== 'idle'}
            onClick={createExam}
          >
            {authorExamStore.status !== 'idle'
              ? 'You have already started the exam'
              : 'Create Exam with this Test'}
          </Button>
        )}
      </Stack>
    </Stack>
  );
});

export default BaseTestInfo;
