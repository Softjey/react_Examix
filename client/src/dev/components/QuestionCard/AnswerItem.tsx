import { UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { CreateTestForm } from '../interfaces';
import QuestionType from '../../../types/api/enums/Type';
import CloseButton from '../buttons/CloseButton';
import IsCorrectButton from './IsCorrectButton';

interface Props {
  register: UseFormRegister<CreateTestForm>;
  answerIndex: number;
  questionIndex: number;
  remove: UseFieldArrayRemove;
  type: QuestionType;
}

const AnswerItem: React.FC<Props> = ({ type, questionIndex, register, answerIndex, remove }) => {
  return (
    <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      <IsCorrectButton
        type={type}
        {...register(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)}
        ref={null}
      />
      <TextField
        {...register(`questions.${questionIndex}.answers.${answerIndex}.title`)}
        autoComplete="off"
        size="small"
        sx={{
          '&:hover .icon-button': {
            visibility: 'visible',
            opacity: 0.7,
          },
        }}
        placeholder={`Answer ${answerIndex + 1}`}
        InputProps={{
          endAdornment: (
            <CloseButton
              disableRipple
              sx={{
                visibility: 'hidden',
                opacity: 0,
                left: 0,
                '&:hover': {
                  color: 'text.primary',
                },
              }}
              className="icon-button"
              aria-label="delete answer"
              onClick={() => remove(answerIndex)}
              edge="end"
            />
          ),
        }}
      />
    </Box>
  );
};

export default AnswerItem;
