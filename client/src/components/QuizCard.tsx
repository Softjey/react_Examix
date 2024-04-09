import {
  Button,
  ButtonGroup,
  CardActions,
  CardContent,
  CardHeader,
  // LinearProgress,
} from '@mui/material';
import Card from '@mui/material/Card';
import { Question, StudentAnswer } from '../temp/questions';
// import Timer from './UI/Timer';
// import RadioButtonGroup from './UI/RadioButtonGroup';

interface Props {
  question: Question;
  sendAnswer: (answer: StudentAnswer) => void;
}

const QuizCard: React.FC<Props> = ({ question: { title, answers, maxScore }, sendAnswer }) => (
  <Card elevation={5} sx={{ width: '500px', padding: '20px' }}>
    <CardHeader title={title} />
    <CardContent>Max score: {maxScore}</CardContent>
    <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ButtonGroup>
        {answers.map((answer) => (
          <Button key={answer.title} onClick={() => sendAnswer(answer)}>
            {answer.title}
          </Button>
        ))}
      </ButtonGroup>
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
    </CardActions>
  </Card>
);

export default QuizCard;
