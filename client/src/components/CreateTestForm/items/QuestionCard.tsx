/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Collapse,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { forwardRef, useState } from 'react';
import QuestionTypeSelect from '../../UI/inputs/QuestionTypeSelect';
import DragBar from '../../../dev/DragBar';
import QuestionType from '../../../types/api/enums/Type';
import DeleteButton from '../../UI/buttons/DeleteButton';
import AnswersGroup from '../groups/AnswersGroup';
import { useCreateTest } from '../../../pages/CreateTestPage/CreateTestContext';
import useCreateTestForm from '../../../hooks/useCreateTestForm';
import MaxScoreInput from '../../UI/inputs/MaxScoreInput';
import ErrorPopover from '../../UI/errors/ErrorPopover';
import CreateTestFormTimeLimitPicker from '../CreateTestFormTimeLimitPicker';
import disableDragEvent from '../../../pages/CreateTestPage/utils/disableDragEvent';
import WarningSnackBar from '../../UI/WarningSnackBar';
import { Nullable } from '../../../types/utils/Nullable';

interface Props extends CardProps {
  type: QuestionType;
  questionIndex: number;
  onDelete: (openSnackBar: () => void) => void;
  isFromServer?: boolean;
}

const QuestionCard = forwardRef<HTMLDivElement, Props>(
  ({ isFromServer, onDelete, type, questionIndex, sx: cardSx, ...props }, ref) => {
    const {
      register,
      control,
      formState: { errors },
    } = useCreateTestForm();

    const { loading } = useCreateTest();
    const disabled = loading || isFromServer;

    const { fields, append, remove } = useFieldArray({
      control,
      name: `questions.${questionIndex}.answers`,
    });

    const [snackBarMessage, setSnackBarMessage] = useState<Nullable<string>>(null);

    const [isInfoOpened, setIsInfoOpened] = useState<boolean>(false);
    const [draggable, setDraggable] = useState<boolean>(false);

    const onAnswerItemRemove = (index: number) => {
      if (fields.length > 2) {
        remove(index);
      } else {
        setSnackBarMessage('Minimum number of answers is 2');
      }
    };

    const onAnswerItemAdd = () => {
      if (fields.length < 6) {
        append({ title: '', isCorrect: false }, { shouldFocus: false });
      } else {
        setSnackBarMessage('Maximum number of answers reached');
      }
    };

    const { ref: questionTypeRef, ...questionTypeReg } = register(
      `questions.${questionIndex}.type`,
    );

    return (
      <>
        <Card
          draggable={draggable}
          ref={ref}
          onMouseEnter={isFromServer ? () => setIsInfoOpened(true) : undefined}
          onMouseLeave={isFromServer ? () => setIsInfoOpened(false) : undefined}
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
            ...cardSx,
          }}
          {...props}
        >
          <DragBar
            sx={{
              '&:active': {
                cursor: 'grabbing',
              },
            }}
            onMouseEnter={() => setDraggable(true)}
            onMouseLeave={() => setDraggable(false)}
          />

          <CardContent
            sx={{
              userSelect: 'none',
              WebkitUserDrag: 'none',
              userDrag: 'none',
              display: 'flex',
              gap: 1,
              flexDirection: 'column',
              paddingBottom: 0,
              paddingTop: 0,
            }}
          >
            <Box display="flex" gap={1} flexWrap="wrap">
              <QuestionTypeSelect
                defaultValue={type}
                disabled={disabled}
                {...questionTypeReg}
                inputRef={questionTypeRef}
              />

              <ErrorPopover
                isError={!!errors.questions?.[questionIndex]?.timeLimit}
                errorMessage={errors.questions?.[questionIndex]?.timeLimit?.message}
              >
                <CreateTestFormTimeLimitPicker
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
                  onDragStart={disableDragEvent}
                  onDragEnd={disableDragEvent}
                  onDragEnter={disableDragEvent}
                  {...register(`questions.${questionIndex}.maxScore`, { valueAsNumber: true })}
                  error={!!errors.questions?.[questionIndex]?.maxScore}
                  disabled={loading}
                />
              </ErrorPopover>

              <DeleteButton
                sx={{ marginLeft: 'auto' }}
                disabled={loading}
                onClick={() =>
                  onDelete(() => {
                    setSnackBarMessage('Minimum number of questions is 1');
                  })
                }
              />
            </Box>

            <TextField
              onDragStart={disableDragEvent}
              onDragEnd={disableDragEvent}
              onDragEnter={disableDragEvent}
              error={!!errors.questions?.[questionIndex]?.title}
              helperText={errors.questions?.[questionIndex]?.title?.message?.toString()}
              {...register(`questions.${questionIndex}.title`)}
              size="small"
              autoComplete="off"
              type="text"
              fullWidth
              placeholder="Question title"
              disabled={disabled}
            />

            <Typography color="text.secondary" variant="body2">
              Answers
            </Typography>

            <AnswersGroup
              isFromServer={isFromServer}
              fields={fields}
              onItemAdd={onAnswerItemAdd}
              onItemRemove={onAnswerItemRemove}
              questionIndex={questionIndex}
              questionType={type}
            />
          </CardContent>
          <CardActions
            sx={{ padding: '16px', paddingTop: '10px', display: 'flex', justifyContent: 'center' }}
          >
            {isFromServer && (
              <Collapse in={isInfoOpened} timeout={300}>
                <Alert sx={{ mt: 1 }} severity="info">
                  <Typography color="info" variant="body2">
                    You can only edit the time limit and maximum score for this question, as it has
                    been added from the library.
                  </Typography>
                </Alert>
              </Collapse>
            )}
          </CardActions>
        </Card>

        <WarningSnackBar open={snackBarMessage !== null} onClose={() => setSnackBarMessage(null)}>
          {snackBarMessage}
        </WarningSnackBar>
      </>
    );
  },
);

export default QuestionCard;
