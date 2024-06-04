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
        timeLimit: 0,
      },
      { shouldFocus: false },
    );

  const contextValue = useMemo(
    () => ({ disabled: loading, setDisabled: setLoading }),
    [loading, setLoading],
  );

  return (
    <DisabledContext.Provider value={contextValue}>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          onSubmit={methods.handleSubmit((data) => {
            setLoading(true);
            // handle server sending
            setTimeout(() => {
              console.log('submitted');
              console.log(data);
              setLoading(false);
            }, 2000);
          })}
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
