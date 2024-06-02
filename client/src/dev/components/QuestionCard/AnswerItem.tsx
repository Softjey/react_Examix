/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { CreateTestForm } from '../interfaces';
import QuestionType from '../../../types/api/enums/Type';
import CloseButton from '../buttons/CloseButton';
import IsCorrectButton from './IsCorrectButton';

interface Props {
  answerIndex: number;
  questionIndex: number;
  type: QuestionType;
  onDelete: () => void;
}

const AnswerItem: React.FC<Props> = ({ type, questionIndex, answerIndex, onDelete }) => {
  const { register, watch, setValue } = useFormContext<CreateTestForm>();

  return (
    <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      <IsCorrectButton
        {...register(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)}
        type={type}
        ref={null}
        /* this is neccessary because mui checkbox component
        is not working correctly with react-hook-form */
        checked={watch(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)}
        onChange={(e) =>
          setValue(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`, e.target.checked)
        }
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
              onClick={onDelete}
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
              edge="end"
            />
          ),
        }}
      />
    </Box>
  );
};

export default AnswerItem;
