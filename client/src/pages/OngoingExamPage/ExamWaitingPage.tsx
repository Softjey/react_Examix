import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import QuizLayout from '../../components/layouts/QuizLayout';
import BaseTestInfo from '../../components/common/BaseTestInfo';
import DottedText from '../../dev/DottedText/DottedText';
import StudentsList from '../../components/common/StudentsList';
import studentExamStore from '../../store/ExamStore/StudentExamStore';

interface Props {}

const ExamWaitingPage: React.FC<Props> = observer(() => {
  const { exam } = studentExamStore;

  return (
    <QuizLayout>
      {exam?.test && (
        <BaseTestInfo
          test={exam.test}
          action={<DottedText variant="h6">Waiting for the exam to start</DottedText>}
        />
      )}

      <Paper component={Stack} variant="outlined" spacing={4} padding={4}>
        {exam?.students?.length !== 0 && (
          <Typography variant="h4" textAlign="center">
            Connected students:
          </Typography>
        )}

        <StudentsList students={exam?.students ?? []} />
      </Paper>
    </QuizLayout>
  );
});

export default ExamWaitingPage;
