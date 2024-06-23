import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import QuizLayout from '../../components/layouts/QuizLayout';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import Routes from '../../services/Router/Routes';
import getRandom from '../../utils/getRandom';
import Button from '../../components/UI/buttons/Button';
import usePublicFolder from '../../hooks/usePublicFolder';

interface Props {}

const ExamFinishedPage: React.FC<Props> = observer(() => {
  const navigate = useNavigate();
  const randomNum = useMemo(() => getRandom(1, 19), []);
  const gifSrc = usePublicFolder(`gifs/exam-finished/${randomNum}.gif`);

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
      <Stack direction="column" spacing={3} alignItems="center">
        <Typography variant="h3" align="center">
          Exam Completed!
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color={(t) => t.palette.text.secondary}
          paragraph
        >
          Hey, great job on the exam! Time to chill and recharge. You deserve a break.
        </Typography>

        <img
          src={gifSrc}
          alt="Test completed. Good job!"
          css={{ maxHeight: '300px', maxWidth: '100%' }}
        />

        <Button size="large" onClick={handleGoHomeClick} variant="contained">
          Return to Home
        </Button>
      </Stack>
    </QuizLayout>
  );
});

export default ExamFinishedPage;
