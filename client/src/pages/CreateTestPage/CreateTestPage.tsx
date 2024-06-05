/* eslint-disable no-console */

import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TestInfo from '../../components/TestInfo';
import { CreateTestForm, CreateTestSchema } from '../../schemas/createTestFormValidationSchemas';
import QuestionsGroup from '../../dev/components/QuestionsGroup';
import LoadingButton from '../../components/UI/buttons/LoadingButton';
import { useCreateTest } from './CreateTestContext';
import Subject from '../../types/api/enums/Subject';
import { CreateTestDto } from '../../services/Api/types/create-test';
import getFilteredQuestions from './utils/getFilteredQuestions';
import getPreparedTestQuestions from './utils/getPreparedTestQuestions';
import getDefaultQuestion from './utils/getDefaultQuestion';
import HomeLayout from '../../components/layouts/HomeLayout';

interface Props {}

const defaultValues: CreateTestForm = {
  testImageLink: null,
  testName: '',
  testDescription: '',
  subject: '',
  questions: [getDefaultQuestion()],
};

const CreateTestPage: React.FC<Props> = () => {
  const { loading, createQuestionsMutation, createTestMutation } = useCreateTest();
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

    const filteredQuestions = getFilteredQuestions(data);

    console.log('data to send', filteredQuestions);

    createQuestions(filteredQuestions, {
      onError: (error) => console.dir(error),
      onSuccess: (createQuestionsResponse) => {
        console.log('create questions response: ', createQuestionsResponse);

        const testData: CreateTestDto = {
          name: data.testName,
          description: data.testDescription,
          image: data.testImageLink,
          questions: getPreparedTestQuestions(createQuestionsResponse.questions, data),
        };

        if (data.subject) {
          console.log('subject: ', data.subject);
          testData.subject = data.subject as Subject;
        }

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
      <HomeLayout centered>
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
      </HomeLayout>
    </FormProvider>
  );
};

export default CreateTestPage;
