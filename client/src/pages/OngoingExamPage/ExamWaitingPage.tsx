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
  const { students, test } = studentExamStore;

  return (
    <QuizLayout>
      {test && (
        <BaseTestInfo
          test={test}
          action={<DottedText variant="h6">Waiting for the exam to start</DottedText>}
        />
      )}

      <Paper component={Stack} variant="outlined" spacing={4} padding={4}>
        {students?.length !== 0 && (
          <Typography variant="h4" textAlign="center">
            Connected students:
          </Typography>
        )}

        <StudentsList students={students ?? []} />
      </Paper>
    </QuizLayout>
  );
});

export default ExamWaitingPage;
