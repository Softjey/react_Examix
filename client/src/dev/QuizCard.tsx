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
import AnswersButtonGroup from '../components/UI/AnswersButtonGroup';
import { Question, StudentAnswer } from './questions';
import CircularProgressWithLabel from './CircularProgressWithLabel';

interface CardProps {
  question: Question;
  sendAnswer: (answers: StudentAnswer[]) => void;
  questionsAmount: number | undefined;
}

const QuizCard: React.FC<CardProps> = memo(
  ({ question: { title, answers, maxScore, type, index }, questionsAmount, sendAnswer }) => {
    const [selectedValue, setSelectedValue] = useState<StudentAnswer[] | null>([]);
    const [isShowAnswers, setIsShowAnswers] = useState(true);

    useEffect(() => {
      setIsShowAnswers(true);
    }, [answers]);

    useEffect(() => {
      if (selectedValue) {
        sendAnswer(selectedValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue]);

    return isShowAnswers ? (
      <Card
        elevation={3}
        sx={{ minWidth: '350px', maxWidth: '500px', padding: '15px', borderRadius: '10px' }}
      >
        <CardHeader title={title} />
        <CardContent
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Max score: {maxScore}
          </Typography>
          {questionsAmount && (
            <CircularProgressWithLabel
              size={50}
              thickness={3}
              value={((index + 1) / questionsAmount) * 100}
              label={`${index + 1}/${questionsAmount}`}
            />
          )}
        </CardContent>
        <CardActions sx={{ padding: '12px' }}>
          <AnswersButtonGroup
            answers={answers}
            setIsShowAnswers={setIsShowAnswers}
            setValue={setSelectedValue}
            type={type}
          />
        </CardActions>
      </Card>
    ) : (
      <Alert sx={{ width: '400px' }} severity="info">
        <AlertTitle>Wait for the timer to end</AlertTitle>
      </Alert>
    );
  },
);

export default QuizCard;
