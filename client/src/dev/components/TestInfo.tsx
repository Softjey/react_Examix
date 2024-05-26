import { Box, BoxProps, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import SubjectSelect from './SubjectSelect';
import ImageUploader from './ImageUploader';
// eslint-disable-next-line import/no-cycle
import { CreateTestForm } from '../CreateTestPage';

interface Props extends BoxProps {
  register: UseFormRegister<CreateTestForm>;
  errors: FieldErrors<CreateTestForm>;
}

const TestInfo: React.FC<Props> = ({ register, errors, sx, ...rest }) => {
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
        {...register('testName', { required: true })}
        error={!!errors.testName}
        helperText={errors.testName?.type === 'required' ? 'Test name is required' : ''}
        autoComplete="off"
        type="text"
        label="Test name"
      />
      <SubjectSelect
        {...register('subject', { required: true })}
        error={!!errors.subject}
        helperText={errors.subject?.type === 'required' ? 'Subject is required' : ''}
        ref={null}
      />
      <TextField
        {...register('testDescription', { required: true })}
        error={!!errors.testDescription}
        helperText={errors.testDescription?.type === 'required' ? 'Description is required' : ''}
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
