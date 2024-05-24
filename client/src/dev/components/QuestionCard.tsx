import { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardProps,
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
import DragBar from './DragBar';

const maxAnswersLength = 6;

interface Props extends CardProps {}

const QuestionCard: React.FC<Props> = ({ ...props }) => {
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
  const [draggable, setDraggable] = useState(false);
  // TODO: add drag logic

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
    <Card
      {...props}
      draggable={draggable}
      component={Paper}
      elevation={2}
      sx={{
        pointerEvents: 'auto',
        maxWidth: '460px',
        borderRadius: '12px',
        '&:hover .drag-bar': {
          opacity: 0.7,
          visibility: 'visible',
        },
      }}
    >
      <DragBar onMouseEnter={() => setDraggable(true)} onMouseLeave={() => setDraggable(false)} />
      <CardContent
        sx={{ display: 'flex', gap: 1, flexDirection: 'column', paddingBottom: 0, paddingTop: 0 }}
      >
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
