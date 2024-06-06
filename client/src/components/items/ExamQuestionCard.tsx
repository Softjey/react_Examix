import { Card, CardHeader, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Typography, CardActions, Stack, CardProps } from '@mui/material';
import CircularProgressWithLabel from '../../dev/CircularProgressWithLabel';
import { StudentQuestion } from '../../types/api/entities/testQuestion';
import { StudentAnswer } from '../../types/api/entities/question';
import AnswerGroup from '../UI/AnswersGroup/AnswersGroup';

interface Props extends CardProps {
  question: StudentQuestion;
  onAnswer: (answers: StudentAnswer[]) => void;
  questionsAmount: number | undefined;
}

const ExamQuestionCard: React.FC<Props> = ({
  question,
  questionsAmount,
  onAnswer,
  sx,
  ...rest
}) => {
  const [answered, setAnswered] = useState(false);
  const { title, answers, maxScore, type, index } = question;
  const questionIndex = index + 1;

  const handleAnswer = (newAnswers: StudentAnswer[]) => {
    onAnswer(newAnswers);
    setAnswered(true);
  };

  useEffect(() => {
    setAnswered(false);
  }, [questionIndex]);

  return (
    <Card elevation={3} sx={{ p: 2, userSelect: 'none', ...sx }} {...rest}>
      <CardHeader title={title} sx={{ paddingBlock: 1 }} />

      <CardContent
        component={Stack}
        sx={{ paddingBlock: 0 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1" color="text.secondary">
          Max score: {maxScore}
        </Typography>

        {questionsAmount && (
          <CircularProgressWithLabel
            size={50}
            thickness={3}
            value={(questionIndex / questionsAmount) * 100}
            label={`${questionIndex}/${questionsAmount}`}
          />
        )}
      </CardContent>

      <CardActions sx={{ pl: 2 }}>
        <AnswerGroup
          disabled={answered}
          answers={answers}
          onAnswer={handleAnswer}
          questionType={type}
        />
      </CardActions>
      {answered && (
        <Typography variant="body2" color={(t) => t.palette.warning.light}>
          You already answered this question.
        </Typography>
      )}
    </Card>
  );
};

export default ExamQuestionCard;
