/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-console */
import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TestInfo from '../dev/components/TestInfo/TestInfo';
import QuestionType from '../types/api/enums/Type';
import QuestionCard from '../dev/components/QuestionCard/QuestionCard';
import { CreateTestForm, CreateTestSchema } from '../dev/components/interfaces';

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
  const methods = useForm<CreateTestForm>({
    resolver: zodResolver(CreateTestSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { control } = methods;
  const { errors } = methods.formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchedValues = methods.watch();

  console.log(watchedValues.questions[0].answers);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={methods.handleSubmit((data) => {
          console.log('submitted');
          console.log(data);
        })}
        display="flex"
        flexDirection="column"
        padding="15px 30px"
        gap="32px"
      >
        <TestInfo />

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
    </FormProvider>
  );
};

export default CreateTestPage;
