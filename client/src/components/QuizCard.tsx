/* eslint-disable object-curly-newline */
import { Button, CardActions, CardHeader, ButtonGroup, LinearProgress } from '@mui/material';
import Card from '@mui/material/Card';
import React, { useEffect } from 'react';
import { Question, Answer } from '../temp/questions';
import useCountDown from '../hooks/useCountdown';

interface Props {
  question: Question;
  quizProgress: number;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  nextQuestion: () => void;
}

const QuizCard: React.FC<Props> = ({ question, quizProgress, nextQuestion, setAnswers }) => {
  const { msLeft, start } = useCountDown();

  const fixProgressAnimationStyles = {
    '&[aria-valuenow="100"]': {
      '& > .progressBarInner': {
        transition: 'none',
      },
    },
  };

  const time = 5000;
  const progress = (msLeft / time) * 100;

  function onButtonClick(variant: string) {
    setAnswers((prev) => [...prev, { questionId: question.id, answer: variant }]);
    start(time);
    nextQuestion();
  }

  useEffect(() => {
    start(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (msLeft === 0) {
      onButtonClick('unset');
    }
  });

  return (
    <Card elevation={5} sx={{ width: '500px', padding: '20px' }}>
      <span>{Math.ceil(msLeft / 1000)}</span>
      <LinearProgress
        sx={fixProgressAnimationStyles}
        classes={{ bar: 'progressBarInner' }}
        variant="determinate"
        value={progress}
      />
      <CardHeader title={question.title} />
      <CardActions>
        <ButtonGroup fullWidth orientation="vertical">
          {question.variants.map((variant, i) => (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              onClick={() => onButtonClick(variant)}
              sx={{ height: '60px' }}
              size="large"
            >
              {variant}
            </Button>
          ))}
        </ButtonGroup>
      </CardActions>
      <LinearProgress variant="determinate" value={quizProgress} />
    </Card>
  );
};

export default QuizCard;
