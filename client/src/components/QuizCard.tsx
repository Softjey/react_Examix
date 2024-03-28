/* eslint-disable object-curly-newline */

import { Button, CardActions, CardHeader, ButtonGroup, LinearProgress } from '@mui/material';
import Card from '@mui/material/Card';
import {
  Question,
  Answer,
} from '/Users/junk/Desktop/projects/frontend/react/react_Examix/src/temp/questions';

interface Props {
  question: Question;
  progress: number;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  nextQuestion: () => void;
}

const QuizCard: React.FC<Props> = ({ question, progress, nextQuestion, setAnswers }) => {
  function onButtonClick(variant: string) {
    setAnswers((prev) => [...prev, { questionId: question.id, answer: variant }]);
    nextQuestion();
  }

  return (
    <Card elevation={5} sx={{ width: '500px', padding: '20px' }}>
      <LinearProgress variant="determinate" value={progress} />
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
    </Card>
  );
};

export default QuizCard;
