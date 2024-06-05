import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { CreateTestForm } from '../../schemas/createTestFormValidationSchemas';
import QuestionType from '../../types/api/enums/Type';
import CloseButton from '../UI/buttons/CloseButton';
import RadioCheckBox from '../UI/RadioCheckBox';
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';

interface Props {
  answerIndex: number;
  questionIndex: number;
  type: QuestionType;
  onDelete: () => void;
  onCheckBoxClick: () => void;
}

const FormAnswerItem: React.FC<Props> = ({
  type,
  questionIndex,
  answerIndex,
  onDelete,
  onCheckBoxClick,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateTestForm>();

  const { loading } = useCreateTest();

  return (
    <Box sx={{ display: 'flex', gap: '2px', alignItems: 'start' }}>
      <RadioCheckBox
        {...register(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)}
        type={type}
        ref={null}
        /* this is neccessary because mui checkbox component
        is not working correctly with react-hook-form */
        checked={watch(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)}
        onChange={(e) => {
          onCheckBoxClick();
          setValue(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`, e.target.checked);
        }}
        disabled={loading}
      />
      <TextField
        {...register(`questions.${questionIndex}.answers.${answerIndex}.title`)}
        error={!!errors.questions?.[questionIndex]?.answers?.[answerIndex]?.title}
        helperText={errors.questions?.[questionIndex]?.answers?.[
          answerIndex
        ]?.title?.message?.toString()}
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
        disabled={loading}
      />
    </Box>
  );
};

export default FormAnswerItem;
