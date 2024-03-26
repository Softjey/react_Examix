/* eslint-disable object-curly-newline */

import { Button, CardActions, CardHeader, ButtonGroup, LinearProgress } from '@mui/material';
import Card from '@mui/material/Card';
import { Question, Answer } from '../constants/questions';

interface Props {
  question: Question;
  progress: number;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  nextQuestion: () => void;
}

const QuizCard: React.FC<Props> = ({ question, progress, nextQuestion, setAnswers }) => (
  <Card elevation={5} sx={{ width: '500px', padding: '20px' }}>
    <LinearProgress variant="determinate" value={progress} />
    <CardHeader title={question.title} />
    <CardActions>
      <ButtonGroup fullWidth orientation="vertical">
        {question.variants.map((varinat) => (
          <Button
            onClick={() => {
              setAnswers((prev) => [
                ...prev,
                {
                  questionId: question.id,
                  answer: varinat,
                },
              ]);
              nextQuestion();
            }}
            sx={{ height: '60px' }}
            size="large"
          >
            {varinat}
          </Button>
        ))}
      </ButtonGroup>
    </CardActions>
  </Card>
);
export default QuizCard;
