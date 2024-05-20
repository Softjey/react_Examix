import { Box, Checkbox, IconButton, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Answer } from '../../types/api/question';

export interface AnswerWithId extends Answer {
  id: number;
}

interface Props {
  answer: AnswerWithId;
  onDelete: (id: number) => void;
}

const AnswerItem: React.FC<Props> = ({ answer, onDelete }) => {
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
      <TextField
        placeholder="Type answer"
        size="small"
        autoComplete="off"
        value={value}
        sx={{
          '&:hover .icon-button': {
            visibility: 'visible',
            opacity: 0.7,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{
                  visibility: 'hidden',
                  opacity: 0,
                  left: 5,
                }}
                className="icon-button"
                size="small"
                aria-label="delete answer"
                onClick={() => onDelete(answer.id)}
                edge="end"
              >
                <DeleteIcon
                  sx={{
                    width: '16px',
                    height: '16px',
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};

export default AnswerItem;
