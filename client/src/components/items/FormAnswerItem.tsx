import { useFormContext } from 'react-hook-form';
import { Box, BoxProps, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { CreateTestForm } from '../../schemas/createTestFormValidationSchemas';
import QuestionType from '../../types/api/enums/Type';
import CloseButton from '../UI/buttons/CloseButton';
import RadioCheckBox from '../UI/buttons/RadioCheckBox';
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';

interface Props extends BoxProps {
  answerIndex: number;
  questionIndex: number;
  type: QuestionType;
  onDelete: () => void;
  onCheckBoxClick: () => void;
  isFromServer?: boolean;
}

const FormAnswerItem: React.FC<Props> = ({
  type,
  questionIndex,
  answerIndex,
  onDelete,
  onCheckBoxClick,
  isFromServer,
  sx,
  ...props
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateTestForm>();

  const { loading } = useCreateTest();
  const disabled = loading || isFromServer;

  const isCorrect = watch(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`);

  const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckBoxClick();
    setValue(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`, e.target.checked);
  };

  const isError = !!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.title;
  const errorMessage =
    errors.questions?.[questionIndex]?.answers?.[answerIndex]?.title?.message?.toString();

  return (
    <Box sx={{ display: 'flex', alignItems: 'start', ...sx }} {...props}>
      <RadioCheckBox
        {...register(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)}
        type={type}
        ref={null}
        /* this is neccessary because mui checkbox component
        is not working correctly with react-hook-form */
        checked={isCorrect}
        onChange={onCheckBoxChange}
        disabled={disabled}
      />
      <TextField
        fullWidth
        {...register(`questions.${questionIndex}.answers.${answerIndex}.title`)}
        error={isError}
        helperText={errorMessage}
        autoComplete="off"
        size="small"
        sx={{
          minWidth: '200px',
          '&:hover .icon-button': disabled
            ? {}
            : {
                visibility: 'visible',
                opacity: 0.7,
              },
        }}
        placeholder={`Answer ${answerIndex + 1}`}
        InputProps={{
          endAdornment: (
            <CloseButton
              disabled={disabled}
              onClick={onDelete}
              disableRipple
              sx={{
                visibility: 'hidden',
                opacity: 0,
                left: 0,
              }}
              className="icon-button"
              aria-label="delete answer"
              edge="end"
            />
          ),
        }}
        disabled={disabled}
      />
    </Box>
  );
};

export default FormAnswerItem;
