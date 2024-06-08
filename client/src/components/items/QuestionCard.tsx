/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import {
  Alert,
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
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';
import TimeLimitPicker from '../../dev/components/TimeLimitPicker';
import MaxScoreInput from '../UI/MaxScoreInput';
import ErrorPopover from '../../dev/components/ErrorPopover';

interface Props extends CardProps {
  type: QuestionType;
  questionIndex: number;
  onDelete: (openSnackBar: () => void) => void;
  isFromServer?: boolean;
}

const QuestionCard: React.FC<Props> = ({
  isFromServer,
  onDelete,
  type,
  questionIndex,
  ...props
}) => {
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
          width: '100%',
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
              disabled={loading || isFromServer}
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
            fullWidth
            placeholder="Question title"
            disabled={loading || isFromServer}
          />

          <Typography color="text.secondary" variant="body2">
            Answers
          </Typography>

          <AnswersGroup
            isFromServer={isFromServer}
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
          {isFromServer && (
            <Alert sx={{ mt: 1 }} severity="info">
              <Typography color="info" variant="body2">
                You can only edit the time limit and maximum score for the question, as it has been
                added from the library.
              </Typography>
            </Alert>
          )}
          <AddButton
            disabled={loading || isFromServer}
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
          <DeleteButton
            disabled={loading}
            onClick={() =>
              onDelete(() => {
                setSnackBarMessage('Minimum number of questions is 1');
                setIsSnackBarOpened(true);
              })
            }
          />
        </CardActions>
      </Card>

      <Snackbar
        open={isSnackBarOpened}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={(_, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setIsSnackBarOpened(false);
        }}
      >
        <Alert onClose={() => setIsSnackBarOpened(false)} variant="filled" severity="warning">
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuestionCard;
