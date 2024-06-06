/* eslint-disable no-console */

import {
  Autocomplete,
  Box,
  Button,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
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
import { textEllipsis } from '../../styles/text';
import { AutocompleteProps } from '../../types/utils/AutocompleteProps';

interface Props {}

const defaultValues: CreateTestForm = {
  testImageLink: null,
  testName: '',
  testDescription: '',
  subject: '',
  questions: [getDefaultQuestion()],
};

const renderOption: AutocompleteProps<Question>['renderOption'] = (
  { ...rest },
  question: Question,
) => {
  return (
    <ListItem {...rest}>
      <ListItemText
        sx={{ marginBlock: '0' }}
        primary={
          <Typography variant="body2" sx={{ maxWidth: '100%', ...textEllipsis }}>
            {question.title}
          </Typography>
        }
        // secondary={<SubjectItem subject={test.subject} endText={test.description} />}
      />
    </ListItem>
  );
};

const CreateTestPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const { reset, loading, createQuestionsMutation, createTestMutation, error } = useCreateTest();
  const { createQuestions } = createQuestionsMutation;
  const { createTest } = createTestMutation;

  const [search, setSearch] = useState<string>('');

  const { questions, ...restQueryParams } = useQuestions({
    search: search || undefined,
    limit: 20,
  });

  const { isLoading } = restQueryParams;

  useEffect(() => {
    console.log('questions', questions);
  }, [questions]);

  useEffect(() => {
    console.log('isPending', isLoading);
  }, [isLoading]);

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

  if (loading) {
    return <LoadingPage layout="home" />;
  }

  const addQuestionCard = () => append(getDefaultQuestion(), { shouldFocus: false });

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

          <Autocomplete
            loading={isLoading}
            disablePortal
            id="combo-box-demo"
            options={questions || []}
            sx={{ width: 300 }}
            renderOption={renderOption}
            // isOptionEqualToValue={(option, query) => option.id === query?.id}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
            renderInput={(params) => (
              <TextField
                value={search}
                onChange={handleSearchChange}
                {...params}
                label="Search questions"
              />
            )}
          />

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
      <ErrorSnackBar
        open={!!error}
        close={() => reset()}
        errorMessage={error?.message || 'Error occurred'}
      />
    </FormProvider>
  );
};

export default CreateTestPage;
