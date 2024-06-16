import { MenuItem, Stack, StackProps, TextField } from '@mui/material';
import SubjectSelect from '../UI/SubjectSelect';
import CreateTestFormImageLinkUploader from './CreateTestFormImageLinkUploader';
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';
import useCreateTestForm from '../../hooks/useCreateTestForm';

interface Props extends StackProps {}

const TestInfo: React.FC<Props> = ({ sx, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useCreateTestForm();

  const { loading } = useCreateTest();

  const { ref: subjectRef, ...subjectRegister } = register('subject');

  return (
    <Stack {...rest} gap="24px" sx={{ width: '100%', ...sx }}>
      <CreateTestFormImageLinkUploader
        sx={{
          alignSelf: 'flex-start',
          maxHeight: '225px',
          maxWidth: '300px',
        }}
      />
      <TextField
        {...register('testName')}
        error={!!errors.testName}
        helperText={errors.testName?.message?.toString()}
        autoComplete="off"
        type="text"
        label="Test name"
        disabled={loading}
      />
      <SubjectSelect
        otherMenuItems={<MenuItem value="">No subject</MenuItem>}
        {...subjectRegister}
        inputRef={subjectRef}
        error={!!errors.subject}
        helperText={errors.subject?.message?.toString()}
        disabled={loading}
      />
      <TextField
        {...register('testDescription')}
        error={!!errors.testDescription}
        helperText={errors.testDescription?.message}
        multiline
        type="text"
        label="Test description"
        minRows={4}
        maxRows={4}
        disabled={loading}
      />
    </Stack>
  );
};

export default TestInfo;
