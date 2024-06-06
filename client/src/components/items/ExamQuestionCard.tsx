import { StackProps, CardProps, CircularProgress } from '@mui/material';
import { Card, CardHeader, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Typography, CardActions, Stack } from '@mui/material';
import CircularProgressWithLabel from '../../dev/CircularProgressWithLabel';
import { StudentQuestion } from '../../types/api/entities/testQuestion';
import { StudentAnswer } from '../../types/api/entities/question';
import AnswerGroup from '../UI/AnswersGroup/AnswersGroup';
import Timer from '../UI/Timer';
import DottedText from '../../dev/DottedText/DottedText';

interface Props extends StackProps {
  question: StudentQuestion;
  onAnswer: (answers: StudentAnswer[]) => void;
  questionsAmount: number | undefined;
  cardProps?: CardProps;
}

const ExamQuestionCard: React.FC<Props> = (props) => {
  const { question, questionsAmount, cardProps, onAnswer, ...rest } = props;
  const [timesUp, setTimesUp] = useState(false);
  const [answered, setAnswered] = useState(false);
  const { title, answers, maxScore, type, index } = question;
  const disabled = timesUp || answered;
  const opacity = timesUp ? 0.5 : 1;
  const questionIndex = index + 1;

  const handleAnswer = (newAnswers: StudentAnswer[]) => {
    onAnswer(newAnswers);
    setAnswered(true);
  };

  useEffect(() => {
    setAnswered(false);
    setTimesUp(false);
  }, [questionIndex]);

  return (
    <Stack {...rest}>
      <Timer
        duration={question.timeLimit * 1000}
        restartDeps={[questionIndex]}
        onEnd={() => setTimesUp(true)}
      />

      <Card
        elevation={3}
        {...cardProps}
        sx={{ position: 'relative', userSelect: 'none', p: 2, ...cardProps?.sx }}
      >
        {timesUp && (
          <Stack
            alignItems="center"
            spacing={3}
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress size={60} />
            <DottedText variant="body1">New question is loading</DottedText>
          </Stack>
        )}

        <CardHeader title={title} sx={{ paddingBlock: 1, opacity }} />

        <CardContent
          component={Stack}
          sx={{ paddingBlock: 0, opacity }}
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
            disabled={disabled}
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
    </Stack>
  );
};

export default ExamQuestionCard;
