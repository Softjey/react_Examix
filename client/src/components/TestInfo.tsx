import { Box, BoxProps, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import ImageUploader from '../dev/components/ImageUploader';
import { CreateTestForm } from '../schemas/createTestFormValidationSchemas';
import SubjectSelect from './UI/SubjectSelect';

interface Props extends BoxProps {}

const TestInfo: React.FC<Props> = ({ sx, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateTestForm>();

  return (
    <Box {...rest} display="flex" flexDirection="column" gap="24px" sx={{ width: '100%', ...sx }}>
      <ImageUploader
        // {...register('testImage')}
        sx={{
          alignSelf: 'start',
          maxHeight: '150px',
          maxWidth: '200px',
        }}
      />
      <TextField
        {...register('testName')}
        error={!!errors.testName}
        helperText={errors.testName?.message?.toString()}
        autoComplete="off"
        type="text"
        label="Test name"
      />
      <SubjectSelect
        {...register('subject')}
        error={!!errors.subject}
        helperText={errors.subject?.message?.toString()}
        ref={null}
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
      />
    </Box>
  );
};

export default TestInfo;
