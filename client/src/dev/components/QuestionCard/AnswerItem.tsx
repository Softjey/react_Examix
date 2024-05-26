/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import { Checkbox, FormControlLabel, IconButton, Radio, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateTestForm } from '../test/interfaces';
import QuestionType from '../../../types/api/enums/Type';

interface Props {
  register: UseFormRegister<CreateTestForm>;
  answerIndex: number;
  questionIndex: number;
  remove: UseFieldArrayRemove;
  type: QuestionType;
}

const AnswerItem: React.FC<Props> = ({ type, questionIndex, register, answerIndex, remove }) => {
  return (
    <FormControlLabel
      {...register(`questions.${questionIndex}.answers.${answerIndex}.isCorrect` as const)}
      control={
        type === QuestionType.SINGLE_CHOICE ? (
          <Radio />
        ) : type === QuestionType.MULTIPLE_CHOICE ? (
          <Checkbox />
        ) : (
          <></>
        )
      }
      label={
        <TextField
          {...register(`questions.${questionIndex}.answers.${answerIndex}.title` as const)}
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
              <IconButton
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
              >
                <DeleteIcon
                  sx={{
                    width: '20px',
                    height: '20px',
                  }}
                />
              </IconButton>
            ),
          }}
        />
      }
    />
  );
};

export default AnswerItem;
