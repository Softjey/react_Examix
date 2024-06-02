import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import QuestionTypeSelect from './QuestionTypeSelect';
import TimeLimitInput from './TimeLimitInput';
import AddButton from '../buttons/AddButton';
import DragBar from './DragBar';
import { CreateTestForm } from '../interfaces';
import QuestionType from '../../../types/api/enums/Type';
import DeleteButton from '../buttons/DeleteButton';
import AnswersGroup from './AnswersGroup';

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{
        pointerEvents: 'auto',
        maxWidth: '460px',
        borderRadius: '12px',
        '&:hover .drag-bar': {
          opacity: 0.7,
          visibility: 'visible',
        },
      }}
      {...props}
    >
      <DragBar />

      <CardContent
        sx={{ display: 'flex', gap: 1, flexDirection: 'column', paddingBottom: 0, paddingTop: 0 }}
      >
        <Box display="flex" gap={1} flexWrap="wrap">
          <QuestionTypeSelect {...register(`questions.${questionIndex}.type`)} ref={null} />

          <TimeLimitInput
            {...register(`questions.${questionIndex}.timeLimit`)}
            ref={null}
            disabled
          />

          <TextField
            error={!!errors.questions?.[questionIndex]?.maxScore}
            helperText={errors.questions?.[questionIndex]?.maxScore?.message?.toString()}
            {...register(`questions.${questionIndex}.maxScore`, { valueAsNumber: true })}
            type="text"
            size="small"
            sx={{ maxWidth: '80px' }}
            inputMode="numeric"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <Typography color="text.secondary" sx={{ marginRight: '-4px' }} variant="body2">
                  pts
                </Typography>
              ),
              inputProps: {
                maxLength: 3,
              },
            }}
          />
        </Box>

        <TextField
          error={!!errors.questions?.[questionIndex]?.title}
          helperText={errors.questions?.[questionIndex]?.title?.message?.toString()}
          {...register(`questions.${questionIndex}.title`)}
          size="small"
          autoComplete="off"
          type="text"
          label="Title"
        />

        <Typography color="text.secondary" variant="body2">
          Answers
        </Typography>

        <AnswersGroup
          fields={fields}
          remove={remove}
          questionIndex={questionIndex}
          questionType={type}
        />
      </CardContent>

      <CardActions
        sx={{ padding: '16px', paddingTop: '10px', display: 'flex', justifyContent: 'end' }}
      >
        <AddButton onClick={() => append({ title: '', isCorrect: false })} />
        <DeleteButton onClick={onDelete} />
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
