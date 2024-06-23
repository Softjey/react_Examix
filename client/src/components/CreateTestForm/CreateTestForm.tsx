import { Stack, TextField, Typography } from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import {
  CreateTestFormType,
  CreateTestSchema,
  QuestionFromServer,
} from './schemas/createTestFormValidationSchemas';
import defaultValues from '../../pages/CreateTestPage/defaultValues';
import getDefaultQuestion from '../../pages/CreateTestPage/utils/getDefaultQuestion';
import getFilteredQuestions from '../../pages/CreateTestPage/utils/getFilteredQuestions';
import getPreparedTestQuestions from '../../pages/CreateTestPage/utils/getPreparedTestQuestions';
import LoadingPage from '../../pages/LoadingPage';
import { CreateTestDto } from '../../services/Api/types/create-test';
import { Question } from '../../types/api/entities/question';
import Subject from '../../types/api/enums/Subject';
import { AvailableQuestionType } from '../../types/api/enums/Type';
import QuestionsAutocompleteModal from '../UI/QuestionsAutoComplete/QuestionsAutocompleteModal';
import LoadingButton from '../UI/buttons/LoadingButton';
import TestInfo from './TestInfo';
import FormQuestionList from './groups/FormQuestionList';
import Button from '../UI/buttons/Button';
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';
import Routes from '../../services/Router/Routes';
import useQuestions from '../../hooks/queries/useQuestions';
import { Nullable } from '../../types/utils/Nullable';
import AlertSnackbar from '../UI/AlertSnackbar';

interface Props {}

const CreateTestForm: React.FC<Props> = () => {
  const navigate = useNavigate();

  const { reset, loading, createQuestionsMutation, createTestMutation, error } = useCreateTest();
  const { createQuestions } = createQuestionsMutation;
  const { createTest } = createTestMutation;

  const [search, setSearch] = useState<string>('');
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const [warningMessage, setWarningMessage] = useState<Nullable<string>>(null);

  const { questions, ...restQueryParams } = useQuestions({
    search: search || undefined,
    limit: 20,
  });

  const { isLoading } = restQueryParams;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const methods = useForm<CreateTestFormType>({
    resolver: zodResolver(CreateTestSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const shouldScroll = useRef<boolean>(false);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'questions',
  });

  const addQuestionCard = () => {
    append(getDefaultQuestion(), { shouldFocus: false });
    shouldScroll.current = true;
  };

  const addQuestionCardFromServer = ({ type, ...question }: Question) => {
    const { maxScore, timeLimit } = getDefaultQuestion();

    const formQuestions = methods.watch('questions') as QuestionFromServer[];
    const isDuplicate = formQuestions.some((formQuestion) => formQuestion.id === question.id);

    if (isDuplicate) {
      setWarningMessage('This question has already been added');
      return;
    }

    append(
      {
        ...question,
        type: type as AvailableQuestionType,
        isFromServer: true,
        maxScore,
        timeLimit,
      },
      { shouldFocus: false },
    );

    shouldScroll.current = true;
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
      <Stack
        component="form"
        noValidate
        onSubmit={onSubmit}
        alignItems="center"
        padding="15px 30px"
        gap="32px"
      >
        <TestInfo />

        <Typography sx={{ width: '100%' }} variant="h6">
          Questions
        </Typography>

        {fields.length >= 3 && (
          <Stack marginLeft="760px">
            <LoadingButton variant="contained" size="large" type="submit" loading={loading}>
              Create Test
            </LoadingButton>
          </Stack>
        )}

        <FormQuestionList
          shouldScroll={shouldScroll}
          width="100%"
          questionFields={fields}
          onRemove={remove}
        />

        <Stack width="100%" direction="row" justifyContent="start" gap={2}>
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

        <LoadingButton variant="contained" size="large" type="submit" loading={loading}>
          Create Test
        </LoadingButton>
      </Stack>

      <AlertSnackbar severity="error" open={!!error} onClose={reset}>
        {error?.message || 'Error occurred'}
      </AlertSnackbar>

      <AlertSnackbar
        severity="warning"
        open={warningMessage !== null}
        onClose={() => setWarningMessage(null)}
      >
        {warningMessage}
      </AlertSnackbar>

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

export default CreateTestForm;
