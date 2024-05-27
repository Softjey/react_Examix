import { Box, BoxProps, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import SubjectSelect from './SubjectSelect';
import ImageUploader from './ImageUploader';
import { CreateTestForm } from '../interfaces';

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
