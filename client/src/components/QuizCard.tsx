// eslint-disable-next-line object-curly-newline
import { CardActions, CardHeader, LinearProgress } from '@mui/material';
import Card from '@mui/material/Card';
import { Question, Answer } from '../temp/questions';
import Timer from './UI/Timer';
import RadioButtonGroup from './UI/RadioButtonGroup';

interface Props {
  question: Question;
  questionIndex: number;
  questionsLength: number;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  nextQuestion: () => void;
}

const QuizCard: React.FC<Props> = ({
  question,
  questionsLength,
  questionIndex,
  nextQuestion,
  setAnswers,
}) => {
  const quizProgress = Math.ceil((questionIndex / questionsLength) * 100);

  const onTimerEnd = () => {
    setAnswers((prev) => [...prev, { questionId: question.id, answer: 'unset' }]);
    nextQuestion();
  };

  return (
    <Card elevation={5} sx={{ width: '500px', padding: '20px' }}>
      <Timer onEnd={onTimerEnd} seconds={5} />
      <CardHeader title={question.title} />
      <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* <ButtonGroup fullWidth orientation="vertical">
          {question.variants.map((variant, i) => (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              onClick={() => {
                setAnswers((prev) => [...prev, { questionId: question.id, answer: variant }]);
              }}
              sx={{ height: '60px' }}
              size="large"
            >
              {variant}
            </Button>
          ))}
        </ButtonGroup>
        */}
        <RadioButtonGroup question={question} />
      </CardActions>
      <LinearProgress variant="determinate" value={quizProgress} />
      <span>
        {questionIndex}/{questionsLength}
      </span>
    </Card>
  );
};

export default QuizCard;
