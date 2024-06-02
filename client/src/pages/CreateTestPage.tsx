/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TestInfo from '../components/TestInfo';
import QuestionType from '../types/api/enums/Type';
import QuestionCard from '../components/items/QuestionCard';
import { CreateTestForm, CreateTestSchema } from '../schemas/createTestFormValidationSchemas';

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

        {(errors.questions?.message || errors.questions?.root?.message) && (
          <Typography color="error" variant="body1">
            {errors.questions.message || errors.questions.root?.message}
          </Typography>
        )}

        <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
          {fields.map((field, index) => (
            <QuestionCard
              key={field.id}
              questionIndex={index}
              type={methods.watch(`questions.${index}.type`)}
              onDelete={() => remove(index)}
            />
          ))}
        </Box>
        <Button
          type="button"
          onClick={() =>
            append(
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
              { shouldFocus: false },
            )
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
