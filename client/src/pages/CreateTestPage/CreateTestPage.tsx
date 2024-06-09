import { Box, Stack, TextField, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import dayjs from 'dayjs';
import TestInfo from '../../components/CreateTestForm/TestInfo';
import {
  CreateTestForm,
  CreateTestSchema,
  QuestionFromServer,
} from '../../schemas/createTestFormValidationSchemas';
import FormQuestionList from '../../components/CreateTestForm/groups/FormQuestionList';
import LoadingButton from '../../components/UI/buttons/LoadingButton';
import { useCreateTest } from './CreateTestContext';
import Subject from '../../types/api/enums/Subject';
import { CreateTestDto } from '../../services/Api/types/create-test';
import getFilteredQuestions from './utils/getFilteredQuestions';
import getPreparedTestQuestions from './utils/getPreparedTestQuestions';
import getDefaultQuestion from './utils/getDefaultQuestion';
import HomeLayout from '../../components/layouts/HomeLayout';
import ErrorSnackBar from '../../components/UI/errors/ErrorSnackBar';
import LoadingPage from '../LoadingPage';
import Routes from '../../services/Router/Routes';
import useQuestions from '../../hooks/queries/useQuestions';
import { Question } from '../../types/api/entities/question';
import { AvailableQuestionType } from '../../types/api/enums/Type';
import QuestionsAutocompleteModal from '../../components/UI/QuestionsAutoComplete/QuestionsAutocompleteModal';
import defaultValues from './defaultValues';
import Button from '../../components/UI/buttons/Button';

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
        type: type as AvailableQuestionType,
        isFromServer: true,
        maxScore: 0,
        timeLimit: dayjs().startOf('hour'),
      },
      { shouldFocus: false },
    );
  };

  const onSubmit = methods.handleSubmit((data) => {
    const filteredQuestions = getFilteredQuestions(data);
    const questionsFromServer = data.questions.filter((question) => question.isFromServer);

    createQuestions(filteredQuestions, {
      onSuccess: (createQuestionsResponse) => {
        const testData: CreateTestDto = {
          name: data.testName,
          description: data.testDescription,
          image: data.testImageLink,
          questions: getPreparedTestQuestions(
            createQuestionsResponse.questions,
            questionsFromServer as QuestionFromServer[],
            data.questions,
          ),
        };

        if (data.subject) {
          testData.subject = data.subject as Subject;
        }

        createTest(testData, {
          onSuccess: (test) => {
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
          alignItems="center"
          padding="15px 30px"
          gap="32px"
        >
          <TestInfo />

          <Typography sx={{ width: '100%' }} variant="h6">
            Questions
          </Typography>

          <FormQuestionList width="100%" questions={fields} onRemove={remove} />

          <Stack width="100%" flexDirection="row" justifyContent="start" gap={2}>
            <Button
              sx={{ textTransform: 'none' }}
              variant="outlined"
              color="secondary"
              disabled={loading}
              type="button"
              onClick={addQuestionCard}
            >
              Add new question
            </Button>

            <Button
              sx={{ textTransform: 'none' }}
              variant="outlined"
              color="secondary"
              disabled={loading}
              type="button"
              onClick={() => setIsModalOpened(true)}
            >
              Add question from library
            </Button>
          </Stack>

          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            loading={loading}
            buttonBase={Button}
          >
            Create Test
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

            setSearch('');
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
