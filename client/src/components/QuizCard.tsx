/* eslint-disable object-curly-newline */
import { Button, CardActions, CardHeader, ButtonGroup, LinearProgress } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import { Question, Answer } from '../temp/questions';
import useCountDown from '../hoooks/useCountdown';

interface Props {
  question: Question;
  progress: number;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  nextQuestion: () => void;
}

const QuizCard: React.FC<Props> = ({ question, progress, nextQuestion, setAnswers }) => {
  const { msLeft, start } = useCountDown();

  const time = 5000;

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
      setAnswers((prev) => [...prev, { questionId: question.id, answer: 'unset' }]);
      start(time);
      nextQuestion();
    }
  });

  return (
    <Card elevation={5} sx={{ width: '500px', padding: '20px' }}>
      <span>{Math.ceil(msLeft / 1000)}</span>
      <LinearProgress variant="determinate" value={(msLeft / time) * 100} />
      <CardHeader title={question.title} />
      <CardActions>
        <ButtonGroup fullWidth orientation="vertical">
          {question.variants.map((variant) => (
            <Button onClick={() => onButtonClick(variant)} sx={{ height: '60px' }} size="large">
              {variant}
            </Button>
          ))}
        </ButtonGroup>
      </CardActions>
      <LinearProgress variant="determinate" value={progress} />
    </Card>
  );
};

export default QuizCard;
