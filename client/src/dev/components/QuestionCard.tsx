import { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import useIds from '../useIds';
import { QuestionType } from '../questions';
import { formatStringToNumber } from '../formatter';
import AnswerItem, { AnswerWithId } from './AnswerItem';
import QuestionTypeSelect from './QuestionTypeSelect';
import MaxScoreInput from './MaxScoreInput';
import TimeLimitInput from './TimeLimitInput';
import QuestionTitleInput from './QuestionTitleInput';
import AddButton from './buttons/AddButton';
import CloseButton from './buttons/CloseButton';
import DragButton from './buttons/DragButton';

const maxAnswersLength = 6;

interface Props {}

const QuestionCard: React.FC<Props> = () => {
  const getId = useIds();
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.SINGLE_CHOICE);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [answers, setAnswers] = useState<AnswerWithId[]>(() => [
    { title: 'test', isCorrect: true, id: getId() },
    { title: 'test2', isCorrect: false, id: getId() },
    { title: 'test3', isCorrect: false, id: getId() },
  ]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const addAnwer = () => {
    if (answers.length < maxAnswersLength) {
      setAnswers([...answers, { title: '', isCorrect: false, id: getId() }]);
    } else {
      setSnackbarOpen(true);
      setAlertMessage('Max answers length reached');
    }
  };

  const deleteAnswer = (id: number) => {
    setAnswers((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAlertClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setTimeout(() => setAlertMessage(null), 1000);
  };

  return (
    <Card component={Paper} elevation={2} sx={{ maxWidth: '460px', borderRadius: '12px' }}>
      <CardHeader sx={{ color: '#000' }}>
        <DragButton />
      </CardHeader>
      <CardContent sx={{ display: 'flex', gap: 1, flexDirection: 'column', paddingBottom: 0 }}>
        <Box display="flex" gap={1} flexWrap="wrap">
          <QuestionTypeSelect
            questionType={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          />

          <TimeLimitInput disabled />

          <MaxScoreInput
            maxScore={maxScore}
            onChange={(e) => setMaxScore(formatStringToNumber(e.target.value))}
          />
        </Box>

        <QuestionTitleInput title={title} onChange={(e) => setTitle(e.target.value)} />

        <Typography color="text.secondary" variant="body2">
          Answers
        </Typography>

        <Box display="grid" gap={1} gridTemplateColumns="1fr 1fr" width="100%">
          {answers.map((answer) => (
            <AnswerItem key={answer.id} answer={answer} onDelete={deleteAnswer} />
          ))}
        </Box>
      </CardContent>
      <CardActions
        sx={{ padding: '16px', paddingTop: '10px', display: 'flex', justifyContent: 'end' }}
      >
        <AddButton onClick={addAnwer} />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          message={alertMessage}
          action={<CloseButton onClick={handleAlertClose} />}
        />
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
