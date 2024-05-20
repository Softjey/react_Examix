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
import AddIcon from '@mui/icons-material/Add';
import { QuestionType } from '../questions';
import { formatStringToNumber, snakeCaseToNormal } from '../formatter';

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
      {/* TODO: inputs and question type smaller */}
      {/* TODO: add delete answer button */}
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
    <Card component={Paper} elevation={2} sx={{ maxWidth: '460px', borderRadius: '12px' }}>
      <CardContent sx={{ display: 'flex', gap: 1, flexDirection: 'column', paddingBottom: 0 }}>
        <Box display="flex" gap={1} flexWrap="wrap">
          <TextField
            size="small"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            select
            sx={{ width: '158px' }}
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
            autoComplete="off"
            onChange={(e) => setMaxScore(formatStringToNumber(e.target.value))}
          />
        </Box>

        <TextField
          size="small"
          autoComplete="off"
          type="text"
          label="Title"
          value={title && title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Typography color="text.secondary" variant="body2">
          Answers
        </Typography>

        <Box display="grid" gap={1} gridTemplateColumns="1fr 1fr" width="100%">
          {answers.map((answer) => (
            <AnswerItem answer={answer} />
            // TODO: Просто дай грід контейнеру 100% ширини,
            // і дві колонки і щоб інпути розтягувалися на всю клітинку
          ))}
        </Box>
      </CardContent>
      <CardActions
        sx={{ padding: '16px', paddingTop: '10px', display: 'flex', justifyContent: 'end' }}
      >
        <IconButton
          size="small"
          onClick={() => {
            if (answers.length < maxLength) {
              setAnswers([...answers, { title: '', isCorrect: false }]);
            } else {
              setSnackbarOpen(true);
            }
          }}
        >
          <AddIcon />
        </IconButton>
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
