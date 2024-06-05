/* eslint-disable no-console */

import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import TestInfo from '../components/TestInfo';
import QuestionType from '../types/api/enums/Type';
import { CreateTestForm, CreateTestSchema } from '../schemas/createTestFormValidationSchemas';
import QuestionsGroup from '../dev/components/QuestionsGroup';
import LoadingButton from '../components/UI/buttons/LoadingButton';
import { CreateTestContext } from '../hooks/context/CreateTestContext';
import Subject from '../types/api/enums/Subject';
import { CreateTestDto } from '../services/Api/types/create-test';
import { CreateQuestionsResponse } from '../services/Api/types/create-questions';

interface Props {}

const getDefaultQuestion = () => ({
  title: '',
  type: QuestionType.SINGLE_CHOICE as const,
  answers: [
    { title: '', isCorrect: true },
    { title: '', isCorrect: false },
    { title: '', isCorrect: false },
  ],
  maxScore: 0,
  timeLimit: 1,
});

const defaultValues: CreateTestForm = {
  testImageLink: null,
  testName: '',
  testDescription: '',
  subject: '',
  questions: [getDefaultQuestion()],
};

const prepareTestQuestions = (
  createdQuestions: CreateQuestionsResponse['questions'],
  data: CreateTestForm,
) => {
  return createdQuestions.map(({ id }, i) => ({
    questionId: id,
    maxScore: data.questions[i].maxScore,
    timeLimit: data.questions[i].timeLimit,
  }));
};

const filterQuestions = (data: CreateTestForm) => {
  return data.questions.map((question) => {
    const { maxScore, timeLimit, ...rest } = question;
    return { ...rest, subject: data.subject as Subject };
  });
};

const CreateTestPage: React.FC<Props> = () => {
  const createTestContext = useContext(CreateTestContext);

  if (!createTestContext) {
    throw new Error('DisabledContext must be used within a DisabledContext.Provider');
  }

  const { loading, createQuestionsMutation, createTestMutation } = createTestContext;
  const { createQuestions } = createQuestionsMutation;
  const { createTest } = createTestMutation;

  const methods = useForm<CreateTestForm>({
    resolver: zodResolver(CreateTestSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'questions',
  });

  const addQuestionCard = () => append(getDefaultQuestion(), { shouldFocus: false });

  const onSubmit = methods.handleSubmit((data) => {
    console.log('submitted');

    const filteredQuestions = filterQuestions(data);

    console.log('data to send', filteredQuestions);

    createQuestions(filteredQuestions, {
      onError: (error) => console.dir(error),
      onSuccess: (createQuestionsResponse) => {
        console.log('create questions response: ', createQuestionsResponse);

        const testQuestions = prepareTestQuestions(createQuestionsResponse.questions, data);

        const testData: CreateTestDto = {
          subject: data.subject as Subject,
          name: data.testName,
          description: data.testDescription,
          image: data.testImageLink,
          questions: testQuestions,
        };

        console.log('test data to send: ', testData);
        createTest(testData, {
          onError: (error) => console.dir(error),
          onSuccess: (response) => console.log(response),
        });
      },
    });
  });

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        padding="15px 30px"
        gap="32px"
      >
        <TestInfo />

        <Typography variant="h6">Questions</Typography>

        <QuestionsGroup fields={fields} onRemove={remove} />

        <Button disabled={loading} type="button" onClick={addQuestionCard}>
          Add
        </Button>

        <LoadingButton type="submit" loading={loading} buttonBase={Button}>
          Submit
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};

export default CreateTestPage;
