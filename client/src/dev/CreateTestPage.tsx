/* eslint-disable no-console */
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-cycle
import TestInfo from './components/TestInfo';
import Subject from '../types/api/enums/Subject';

interface Props {}

export interface CreateTestForm {
  testImage: File | null;
  testName: string;
  testDescription: string;
  subject: Subject | null;
}

const defaultValues: CreateTestForm = {
  testImage: null,
  testName: '',
  testDescription: '',
  subject: null,
};

const CreateTestPage: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTestForm>({ defaultValues });

  console.log(errors);

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
    >
      <TestInfo errors={errors} register={register} />
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default CreateTestPage;
