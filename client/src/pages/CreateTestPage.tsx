/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */

import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TestInfo from '../components/TestInfo';
import QuestionType from '../types/api/enums/Type';
import { CreateTestForm, CreateTestSchema } from '../schemas/createTestFormValidationSchemas';
import QuestionsGroup from '../dev/components/QuestionsGroup';

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestionCard = () =>
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
    );

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={methods.handleSubmit((data) => {
          // handle server sending
          console.log('submitted');
          console.log(data);
        })}
        display="flex"
        flexDirection="column"
        padding="15px 30px"
        gap="32px"
      >
        <TestInfo />

        <Typography variant="h6">Questions</Typography>

        <QuestionsGroup fields={fields} onRemove={remove} />

        <Button type="button" onClick={addQuestionCard}>
          Add
        </Button>

        <Button type="submit">Submit</Button>
      </Box>
    </FormProvider>
  );
};

export default CreateTestPage;
