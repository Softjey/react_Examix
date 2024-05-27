/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-console */
import { Box, Button, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TestInfo from './components/TestInfo/TestInfo';
import QuestionType from '../types/api/enums/Type';
import QuestionCard from './components/QuestionCard/QuestionCard';
import { CreateTestForm, CreateTestSchema } from './components/interfaces';

interface Props {}

const defaultValues: CreateTestForm = {
  testImage: null,
  testName: '',
  testDescription: '',
  subject: '',
  questions: [
    {
      title: '',
      type: QuestionType.SINGLE_CHOICE,
      answers: [
        { title: '', isCorrect: true },
        { title: '', isCorrect: false },
        { title: '', isCorrect: false },
      ],
      maxScore: 0,
      timeLimit: 0,
    },
  ],
};

const CreateTestPage: React.FC<Props> = () => {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTestForm>({
    resolver: zodResolver(CreateTestSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchedValues = watch();

  console.log(watchedValues);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log('submitted');
        console.log(data);
      })}
      display="flex"
      flexDirection="column"
      padding="15px 30px"
      gap="32px"
    >
      <TestInfo errors={errors} register={register} />

      {errors.questions && (
        <Typography color="error" variant="body1">
          {errors.questions.message || errors.questions.root?.message}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
        {fields.map((field, index) => (
          <QuestionCard
            key={field.id}
            questionIndex={index}
            type={watchedValues.questions[index].type}
            register={register}
            control={control}
            errors={errors}
            onDelete={() => remove(index)}
          />
        ))}
      </Box>
      <Button
        type="button"
        onClick={() =>
          append({
            title: '',
            type: QuestionType.SINGLE_CHOICE,
            answers: [
              { title: '', isCorrect: true },
              { title: '', isCorrect: false },
              { title: '', isCorrect: false },
            ],
            maxScore: 0,
            timeLimit: 0,
          })
        }
      >
        Add
      </Button>
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default CreateTestPage;
