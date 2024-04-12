import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Alert,
  AlertTitle,
} from '@mui/material';
import { memo, useState, useEffect } from 'react';
import { SingleButtonGroup, MultipleButtonGroup } from '../components/UI/AnswersButtonGroups';
import { Question, StudentAnswer } from './questions';

interface CardProps {
  question: Question;
  sendAnswer: (answer: StudentAnswer[]) => void;
}

const QuizCard: React.FC<CardProps> = memo(({ question: { title, answers, maxScore, type } }) => {
  const [selectedValue, setSelectedValue] = useState<StudentAnswer[]>([]);
  const [isShowAnswers, setIsShowAnswers] = useState(true);

  useEffect(() => {
    setIsShowAnswers(true);
  }, [answers]);

  return isShowAnswers ? (
    <Card>
      <CardHeader title="Max score:" subheader={maxScore} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        {type === 'SINGLE_CHOICE' ? (
          <SingleButtonGroup
            answers={answers}
            setIsShowAnswers={setIsShowAnswers}
            setValue={setSelectedValue}
          />
        ) : (
          <MultipleButtonGroup
            answers={answers}
            setIsShowAnswers={setIsShowAnswers}
            setValue={setSelectedValue}
          />
        )}
      </CardActions>
    </Card>
  ) : (
    <Alert severity="info">
      <AlertTitle>Wait for the timer ends</AlertTitle>
      {JSON.stringify(selectedValue)}
    </Alert>
  );
});

export default QuizCard;
