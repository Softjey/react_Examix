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
import { snakeCaseToNormal } from '../formatter';
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
        gap: 1,
      }}
    >
      <Checkbox
        checked={isCorrect}
        onClick={() => setIsCorrect((prev) => !prev)}
        icon={<CloseIcon color="error" />}
        checkedIcon={<CheckIcon color="success" />}
      />
      <TextField
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Answer"
      />
    </Box>
  );
};

interface Props {}

const QuestionCard: React.FC<Props> = () => {
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.SINGLE_CHOICE);
  const [maxScore, setMaxScore] = useState<number>(1);
  const [title, setTitle] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([
    { title: 'test', isCorrect: true },
    { title: 'test2', isCorrect: false },
    { title: 'test3', isCorrect: false },
  ]);
  const maxLength = 6;

  const points = Array.from({ length: 20 }, (_, i) => i + 1);

  const [open, setOpen] = React.useState(false);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card component={Paper} elevation={2} sx={{ maxWidth: '50vw' }}>
      <CardContent sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
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
          <TextField label="time limit" disabled />
          <TextField
            select
            value={maxScore}
            onChange={(e) => setMaxScore(Number(e.target.value))}
            label="Max score"
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              },
            }}
          >
            {points.map((point) => (
              <MenuItem key={point} value={point}>
                {point} {point === 1 ? 'point' : 'points'}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField
          autoComplete="off"
          type="text"
          label="Question title"
          value={title && title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Typography color="text.secondary" variant="h6">
          Answers
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {answers.map((answer) => (
            <AnswerItem answer={answer} />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            if (answers.length < maxLength) {
              setAnswers([...answers, { title: '', isCorrect: false }]);
            } else {
              setOpen(true);
            }
          }}
        >
          Add answer
        </Button>
        <Snackbar
          open={open}
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
