import { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { QuestionType } from '../questions';
import { formatStringToNumber, snakeCaseToNormal } from '../formatter';
import Button from '../../components/UI/buttons/Button';

interface Answer {
  title: string;
  isCorrect: boolean;
}

const AnswerItem: React.FC<{ answer: Answer }> = ({ answer }) => {
  const [value, setValue] = useState<string | null>(answer && answer.title);
  const [isCorrect, setIsCorrect] = useState<boolean>(answer && answer.isCorrect);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <Checkbox
        size="small"
        checked={isCorrect}
        onClick={() => setIsCorrect((prev) => !prev)}
        icon={<CloseIcon color="error" />}
        checkedIcon={<CheckIcon color="success" />}
      />
      {/* TODO: inputs smaller */}
      <TextField
        placeholder="Type answer"
        size="small"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};

interface Props {}

const QuestionCard: React.FC<Props> = () => {
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.SINGLE_CHOICE);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [title, setTitle] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([
    { title: 'test', isCorrect: true },
    { title: 'test2', isCorrect: false },
    { title: 'test3', isCorrect: false },
  ]);

  const maxLength = 6;

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Card component={Paper} elevation={2} sx={{ maxWidth: '40vw', borderRadius: '12px' }}>
      <CardContent sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        <Box display="flex" gap={1} flexWrap="wrap">
          <TextField
            size="small"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            select
            label="Question type"
          >
            {(Object.keys(QuestionType) as Array<keyof typeof QuestionType>).map((type) => (
              <MenuItem key={type} value={type}>
                {snakeCaseToNormal(type)}
              </MenuItem>
            ))}
          </TextField>

          <TextField size="small" sx={{ maxWidth: '100px' }} label="time limit" disabled />

          <TextField
            sx={{ maxWidth: '100px' }}
            size="small"
            type="text"
            label="Max score"
            inputMode="numeric"
            value={maxScore}
            onChange={(e) => setMaxScore(formatStringToNumber(e.target.value))}
          />
        </Box>

        <TextField
          size="small"
          autoComplete="off"
          type="text"
          label="Question title"
          value={title && title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Typography color="text.secondary" variant="body2">
          Answers
        </Typography>

        <Box display="flex" gap={1} flexWrap="wrap" justifyContent="space-between">
          {answers.map((answer) => (
            <AnswerItem answer={answer} />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ padding: '16px', display: 'flex', justifyContent: 'end' }}>
        <Button
          size="small"
          onClick={() => {
            if (answers.length < maxLength) {
              setAnswers([...answers, { title: '', isCorrect: false }]);
            } else {
              setSnackbarOpen(true);
            }
          }}
        >
          Add answer
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Max answers length reached"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
