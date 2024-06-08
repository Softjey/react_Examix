/* eslint-disable no-console */

import { Box, Button, TextField, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import dayjs from 'dayjs';
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
import ErrorSnackBar from '../../components/UI/ErrorSnackBar';
import LoadingPage from '../LoadingPage';
import Routes from '../../services/Router/Routes';
import useQuestions from '../../hooks/queries/useQuestions';
import { Question } from '../../types/api/entities/question';
import QuestionType from '../../types/api/enums/Type';
import QuestionsAutocompleteModal from '../../components/UI/QuestionsAutoComplete/QuestionsAutocompleteModal';
import defaultValues from './defaultValues';

interface Props {}

const CreateTestPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const { reset, loading, createQuestionsMutation, createTestMutation, error } = useCreateTest();
  const { createQuestions } = createQuestionsMutation;
  const { createTest } = createTestMutation;

  const [search, setSearch] = useState<string>('');
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const { questions, ...restQueryParams } = useQuestions({
    search: search || undefined,
    limit: 20,
  });

  const { isLoading } = restQueryParams;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

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

  const addQuestionCardFromServer = (value: Question) => {
    const { type, ...question } = value;

    append(
      {
        ...question,
        type: type as QuestionType.MULTIPLE_CHOICE | QuestionType.SINGLE_CHOICE,
        isFromServer: true,
        maxScore: 0,
        timeLimit: dayjs().startOf('hour'),
      },
      { shouldFocus: false },
    );

    console.log('question', question);
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log('submitted');

    const filteredQuestions = getFilteredQuestions(data);

    console.log('data to send', filteredQuestions);

    createQuestions(filteredQuestions, {
      onError: (err) => {
        console.dir(err);
      },
      onSuccess: (createQuestionsResponse) => {
        console.log('create questions response: ', createQuestionsResponse);

        const testData: CreateTestDto = {
          name: data.testName,
          description: data.testDescription,
          image: data.testImageLink,
          questions: getPreparedTestQuestions(createQuestionsResponse.questions, data),
        };

        if (data.subject) {
          testData.subject = data.subject as Subject;
        }

        console.log('test data to send: ', testData);
        createTest(testData, {
          onError: (err) => {
            console.dir(err);
          },
          onSuccess: (test) => {
            console.log(test);
            navigate(`${Routes.TEST}/${test.id}`);
          },
        });
      },
    });
  });

  if (loading) {
    return <LoadingPage layout="home" />;
  }

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

          <Button disabled={loading} type="button" onClick={() => setIsModalOpened(true)}>
            Add from lobrary
          </Button>

          <LoadingButton type="submit" loading={loading} buttonBase={Button}>
            Submit
          </LoadingButton>
        </Box>
      </HomeLayout>

      <ErrorSnackBar
        open={!!error}
        onClose={reset}
        errorMessage={error?.message || 'Error occurred'}
      />

      <QuestionsAutocompleteModal
        open={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        autoCompleteProps={{
          options: questions || [],
          onChange: (_, value) => {
            addQuestionCardFromServer(value as Question);

            setIsModalOpened(false);
          },
          loading: isLoading,
          renderInput: (params) => (
            <TextField
              autoFocus
              placeholder="Question"
              value={search}
              onChange={handleSearchChange}
              {...params}
            />
          ),
        }}
      />
    </FormProvider>
  );
};

export default CreateTestPage;
