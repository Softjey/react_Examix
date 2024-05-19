import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { QuestionType } from '../questions';

interface Props {}
const QuestionCard: React.FC<Props> = () => {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Card component={Paper} elevation={2}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <FormControl fullWidth>
            <InputLabel id="question-type-label">Question type</InputLabel>
            <Select
              labelId="question-type-label"
              id="demo-simple-select"
              value={age}
              label="Question type"
              onChange={handleChange}
            >
              {(Object.keys(QuestionType) as Array<keyof typeof QuestionType>).map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
