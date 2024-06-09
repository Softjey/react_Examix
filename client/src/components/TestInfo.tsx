import { Box, BoxProps, MenuItem, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { CreateTestForm } from '../schemas/createTestFormValidationSchemas';
import SubjectSelect from './UI/SubjectSelect';
import ImageLinkUploader from './UI/inputs/ImageLinkUploader';
import { useCreateTest } from '../pages/CreateTestPage/CreateTestContext';

interface Props extends BoxProps {}

const TestInfo: React.FC<Props> = ({ sx, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateTestForm>();

  const { loading } = useCreateTest();

  return (
    <Box {...rest} display="flex" flexDirection="column" gap="24px" sx={{ width: '100%', ...sx }}>
      <ImageLinkUploader
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
        {...register('subject')}
        error={!!errors.subject}
        helperText={errors.subject?.message?.toString()}
        ref={null}
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
    </Box>
  );
};

export default TestInfo;
