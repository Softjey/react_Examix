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
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form';
import QuestionTypeSelect from './QuestionTypeSelect';
import TimeLimitInput from './TimeLimitInput';
import AddButton from '../buttons/AddButton';
import DragBar from './DragBar';
import { CreateTestForm } from '../test/interfaces';
import AnswerItem from './AnswerItem';
import QuestionType from '../../../types/api/enums/Type';
// import RadioCheckBoxGroup from './RadioCheckBoxGroup';

interface Props extends CardProps {
  type: QuestionType;
  control: Control<CreateTestForm> | undefined;
  register: UseFormRegister<CreateTestForm>;
  questionIndex: number;
}

const QuestionCard: React.FC<Props> = ({ type, control, register, questionIndex, ...props }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers` as const,
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
            defaultValue={null}
            disabled
          />

          <TextField
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
          {...register(`questions.${questionIndex}.title`)}
          size="small"
          autoComplete="off"
          type="text"
          label="Title"
        />

        <Typography color="text.secondary" variant="body2">
          Answers
        </Typography>

        {/* FIXME: fix problem with radio and checkbox group */}

        {/* <RadioCheckBoxGroup
          type={type as QuestionType.MULTIPLE_CHOICE | QuestionType.SINGLE_CHOICE}
        >
          {fields.map((field, index) => (
            <AnswerItem
              questionIndex={questionIndex}
              key={field.id}
              type={type}
              register={register}
              remove={remove}
              answerIndex={index}
            />
          ))}
        </RadioCheckBoxGroup> */}

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          {fields.map((field, index) => (
            <AnswerItem
              questionIndex={questionIndex}
              key={field.id}
              type={type}
              register={register}
              remove={remove}
              answerIndex={index}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions
        sx={{ padding: '16px', paddingTop: '10px', display: 'flex', justifyContent: 'end' }}
      >
        <AddButton onClick={() => append({ title: '', isCorrect: false })} />
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
