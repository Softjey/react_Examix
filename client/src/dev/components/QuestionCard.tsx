import { useState } from 'react';
import { Box, Card, CardContent, MenuItem, Paper, TextField } from '@mui/material';
import { QuestionType } from '../questions';
import { snakeCaseToNormal } from '../formatter';

interface Props {}
const QuestionCard: React.FC<Props> = () => {
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.SINGLE_CHOICE);
  const [maxScore, setMaxScore] = useState<number>(1);

  const points = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <Card component={Paper} elevation={2}>
      <CardContent>
        <Box display="flex" gap={3}>
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
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
