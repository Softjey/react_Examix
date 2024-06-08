import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import QuizLayout from '../../components/layouts/QuizLayout';
// import studentExamStore from '../../store/ExamStore/StudentExamStore';
import Routes from '../../services/Router/Routes';
import getRandom from '../../utils/getRandom';
import Button from '../../components/UI/buttons/Button';

interface Props {}

const ExamFinishedPage: React.FC<Props> = observer(() => {
  const [randomNum] = useState(() => getRandom(1, 19));
  const navigate = useNavigate();

  const handleGoHomeClick = () => {
    // studentExamStore.resetExam();
    navigate(Routes.START);
  };

  return (
    <QuizLayout centeredProps={{ sx: { maxWidth: 400 } }}>
      <Stack direction="column" spacing={3} alignItems="center">
        <Typography variant="h3" paragraph>
          Test Completed!
        </Typography>
        <Typography
          variant="body2"
          color={(t) => t.palette.text.secondary}
          paragraph
          sx={{ textAlign: 'center' }}
        >
          Hey, great job on the exam! Time to chill and recharge. You deserve a break.
        </Typography>

        <img
          src={`public/gifs/exam-finished/${randomNum}.gif`}
          alt="Test completed. Good job!"
          style={{ height: '300px', width: 'auto' }}
        />

        <Button size="large" onClick={handleGoHomeClick} variant="contained">
          Return to Home
        </Button>
      </Stack>
    </QuizLayout>
  );
});

export default ExamFinishedPage;
