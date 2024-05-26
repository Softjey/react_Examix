/* eslint-disable no-console */
import { Box, Button } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import TestInfo from './components/TestInfo/TestInfo';
import QuestionType from '../types/api/enums/Type';
import QuestionCard from './components/QuestionCard/QuestionCard';
import { CreateTestForm } from './components/test/interfaces';

interface Props {}

const defaultValues: CreateTestForm = {
  testImage: null,
  testName: '',
  testDescription: '',
  subject: null,
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
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTestForm>({ defaultValues });

  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchedValues = watch();

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log('submitted');
        console.log(data);
      })}
      display="flex"
      flexDirection="column"
      padding="15px 30px"
      gap="32px"
    >
      <TestInfo errors={errors} register={register} />
      <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
        {fields.map((field, index) => (
          <QuestionCard
            type={watchedValues.questions[index].type}
            key={field.id}
            control={control}
            register={register}
            questionIndex={index}
          />
        ))}
      </Box>
      <Button
        type="button"
        onClick={
          () =>
            // eslint-disable-next-line implicit-arrow-linebreak
            append({
              title: '',
              type: QuestionType.SINGLE_CHOICE,
              answers: [
                { title: '', isCorrect: true },
                { title: '', isCorrect: false },
                { title: '', isCorrect: false },
              ],
              maxScore: 0,
              timeLimit: 0,
            })

        }
      >
        Add
      </Button>
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default CreateTestPage;
