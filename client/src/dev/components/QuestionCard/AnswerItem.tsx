/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import { Checkbox, FormControlLabel, Radio, TextField } from '@mui/material';
import { CreateTestForm } from '../interfaces';
import QuestionType from '../../../types/api/enums/Type';
import CloseButton from '../buttons/CloseButton';

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
                iconProps={{
                  sx: {
                    width: '20px',
                    height: '20px',
                  },
                }}
              />
            ),
          }}
        />
      }
    />
  );
};

export default AnswerItem;
