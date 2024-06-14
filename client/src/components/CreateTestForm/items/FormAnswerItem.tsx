import { Box, BoxProps, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import QuestionType from '../../../types/api/enums/Type';
import CloseButton from '../../UI/buttons/CloseButton';
import RadioCheckBox from '../../UI/buttons/RadioCheckBox';
import { useCreateTest } from '../../../pages/CreateTestPage/CreateTestContext';
import useCreateTestForm from '../../../hooks/useCreateTestForm';
import disableDragEvent from '../../../pages/CreateTestPage/utils/disableDragEvent';

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
  } = useCreateTestForm();

  const { loading } = useCreateTest();
  const disabled = loading || isFromServer;

  const isCorrectPath = `questions.${questionIndex}.answers.${answerIndex}.isCorrect` as const;
  const isCorrect = watch(isCorrectPath);

  const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckBoxClick();
    setValue(isCorrectPath, e.target.checked);
  };

  const isError = !!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.title;
  const errorMessage =
    errors.questions?.[questionIndex]?.answers?.[answerIndex]?.title?.message?.toString();

  return (
    <Box sx={{ display: 'flex', alignItems: 'start', ...sx }} {...props}>
      <RadioCheckBox
        {...register(isCorrectPath)}
        type={type}
        /* this is necessary because mui checkbox component
        is not working correctly with react-hook-form */
        ref={null}
        checked={isCorrect}
        onChange={onCheckBoxChange}
        disabled={disabled}
      />
      <TextField
        onDragStart={disableDragEvent}
        onDragEnd={disableDragEvent}
        onDragEnter={disableDragEvent}
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
