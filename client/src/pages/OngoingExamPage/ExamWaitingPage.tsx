import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import QuizLayout from '../../components/layouts/QuizLayout';
import BaseTestInfo from '../../components/common/BaseTestInfo';
import DottedText from '../../dev/DottedText/DottedText';
import StudentsList from '../../components/common/StudentsList';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import Button from '../../components/UI/buttons/Button';

interface Props {}

const ExamWaitingPage: React.FC<Props> = observer(() => {
  const { exam } = studentExamStore;

  const leaveExam = () => {
    studentExamStore.resetExam();
  };

  return (
    <QuizLayout>
      {exam?.test && (
        <BaseTestInfo
          test={exam.test}
          action={
            <Button variant="outlined" color="error" onClick={leaveExam}>
              Leave exam
            </Button>
          }
        />
      )}

      <DottedText variant="h6" align="center">
        Waiting for the exam to start
      </DottedText>

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
