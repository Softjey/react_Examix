import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router';
import QuizLayout from '../../components/layouts/QuizLayout';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import Button from '../../components/UI/buttons/Button';
import Routes from '../../services/Router/Routes';

interface Props {}

const ExamFinishedPage: React.FC<Props> = observer(() => {
  const { exam } = studentExamStore;
  const navigate = useNavigate();

  if (!exam) {
    return <Navigate to={Routes.START} />;
  }

  const handleGoHomeClick = () => {
    studentExamStore.resetExam();
    navigate(Routes.START);
  };

  useEffect(() => {
    return () => {
      studentExamStore.resetExam();
    };
  }, []);

  return (
    <QuizLayout centeredProps={{ sx: { maxWidth: 400 } }}>
      <Typography variant="h4" paragraph>
        Exam Finished. Good job!
      </Typography>

      <Button onClick={handleGoHomeClick} variant="contained">
        Go home
      </Button>
    </QuizLayout>
  );
});

export default ExamFinishedPage;
