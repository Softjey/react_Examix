/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */

import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import TestInfo from '../components/TestInfo';
import QuestionType from '../types/api/enums/Type';
import { CreateTestForm, CreateTestSchema } from '../schemas/createTestFormValidationSchemas';
import QuestionsGroup from '../dev/components/QuestionsGroup';
import LoadingButton from '../components/UI/buttons/LoadingButton';
import DisabledContext from '../hooks/context/DisabledContext';
import ApiClient from '../services/Api/ApiClient';
import Subject from '../types/api/enums/Subject';
import { CreateTestDto } from '../services/Api/types/create-test';
import ApiError from '../services/Api/ApiError';

interface Props {}

const defaultValues: CreateTestForm = {
  testImageLink: null,
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
      timeLimit: 1,
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

  const [loading, setLoading] = useState(false);

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
        timeLimit: 1,
      },
      { shouldFocus: false },
    );

  const contextValue = useMemo(
    () => ({ disabled: loading, setDisabled: setLoading }),
    [loading, setLoading],
  );

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log('submitted');
    setLoading(true);
    const filteredQuestions = data.questions.map((question) => {
      const { maxScore, timeLimit, ...rest } = question;
      return { ...rest, subject: data.subject as Subject };
    });
    console.log('data to send', filteredQuestions);
    try {
      const createQuestionsResponse = await ApiClient.createQuestions(filteredQuestions);

      console.log('create questions response: ', createQuestionsResponse);

      try {
        const testQuestions = createQuestionsResponse.questions.map(({ id }, i) => ({
          questionId: id,
          maxScore: data.questions[i].maxScore,
          timeLimit: data.questions[i].timeLimit,
        }));

        const testData: CreateTestDto = {
          subject: data.subject as Subject,
          name: data.testName,
          description: data.testDescription,
          image: data.testImageLink,
          questions: testQuestions,
        };

        console.log('test data to send: ', testData);

        const createTestResponse = await ApiClient.createTest(testData);

        console.log('create test tesponse: ', createTestResponse);
      } catch (error) {
        console.error(ApiError);
      }
    } catch (error) {
      console.error(ApiError);
    }

    setLoading(false);
  });

  return (
    <DisabledContext.Provider value={contextValue}>
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
    </DisabledContext.Provider>
  );
};

export default CreateTestPage;
