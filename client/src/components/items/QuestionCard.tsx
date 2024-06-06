import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import QuestionTypeSelect from '../UI/QuestionTypeSelect';
import AddButton from '../UI/buttons/AddButton';
import DragBar from '../../dev/components/DragBar';
import { CreateTestForm } from '../../schemas/createTestFormValidationSchemas';
import QuestionType from '../../types/api/enums/Type';
import DeleteButton from '../UI/buttons/DeleteButton';
import AnswersGroup from '../../dev/components/AnswersGroup';
import CloseButton from '../UI/buttons/CloseButton';
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';
import TimeLimitPicker from '../../dev/components/TimeLimitPicker';
import MaxScoreInput from '../UI/MaxScoreInput';
import ErrorPopover from '../../dev/components/ErrorPopover';

interface Props extends CardProps {
  type: QuestionType;
  questionIndex: number;
  onDelete: () => void;
}

const QuestionCard: React.FC<Props> = ({ onDelete, type, questionIndex, ...props }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateTestForm>();

  const { loading } = useCreateTest();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  const [isSnackBarOpened, setIsSnackBarOpened] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');

  return (
    <>
      <Card
        component={Paper}
        elevation={2}
        sx={{
          pointerEvents: 'auto',
          borderRadius: '12px',
          '&:hover .drag-bar': {
            opacity: 0.7,
            visibility: 'visible',
          },
        }}
        {...props}
      >
        <DragBar sx={{ cursor: 'not-allowed' }} title="This feature is unavailable" />

        <CardContent
          sx={{ display: 'flex', gap: 1, flexDirection: 'column', paddingBottom: 0, paddingTop: 0 }}
        >
          <Box display="flex" gap={1} flexWrap="wrap">
            <QuestionTypeSelect
              disabled={loading}
              {...register(`questions.${questionIndex}.type`)}
              ref={null}
            />

            <ErrorPopover
              isError={!!errors.questions?.[questionIndex]?.timeLimit}
              errorMessage={errors.questions?.[questionIndex]?.timeLimit?.message}
            >
              <TimeLimitPicker
                questionIndex={questionIndex}
                error={!!errors.questions?.[questionIndex]?.timeLimit}
                disabled={loading}
              />
            </ErrorPopover>

            <ErrorPopover
              isError={!!errors.questions?.[questionIndex]?.maxScore}
              errorMessage={errors.questions?.[questionIndex]?.maxScore?.message}
            >
              <MaxScoreInput
                {...register(`questions.${questionIndex}.maxScore`, { valueAsNumber: true })}
                error={!!errors.questions?.[questionIndex]?.maxScore}
                disabled={loading}
              />
            </ErrorPopover>
          </Box>

          <TextField
            error={!!errors.questions?.[questionIndex]?.title}
            helperText={errors.questions?.[questionIndex]?.title?.message?.toString()}
            {...register(`questions.${questionIndex}.title`)}
            size="small"
            autoComplete="off"
            type="text"
            placeholder="Question title"
            disabled={loading}
          />

          <Typography color="text.secondary" variant="body2">
            Answers
          </Typography>

          <AnswersGroup
            fields={fields}
            onItemRemove={(index) => {
              if (fields.length > 2) {
                remove(index);
              } else {
                setSnackBarMessage('Minimum number of answers is 2');
                setIsSnackBarOpened(true);
              }
            }}
            questionIndex={questionIndex}
            questionType={type}
          />
        </CardContent>

        <CardActions
          sx={{ padding: '16px', paddingTop: '10px', display: 'flex', justifyContent: 'end' }}
        >
          <AddButton
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              if (fields.length < 6) {
                append({ title: '', isCorrect: false }, { shouldFocus: false });
              } else {
                setSnackBarMessage('Maximum number of answers reached');
                setIsSnackBarOpened(true);
              }
            }}
          />
          <DeleteButton disabled={loading} onClick={onDelete} />
        </CardActions>
      </Card>
      <Snackbar
        open={isSnackBarOpened}
        autoHideDuration={6000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setIsSnackBarOpened(false);
        }}
        message={snackBarMessage}
        action={<CloseButton onClick={() => setIsSnackBarOpened(false)} />}
      />
    </>
  );
};

export default QuestionCard;
