import { TextField, TextFieldProps } from '@mui/material';

interface Props extends TextFieldProps<'standard'> {
  testDescription: string;
}

const TestDescriptionInput: React.FC<Props> = ({ testDescription, onChange, ...rest }) => {
  return (
    <TextField
      value={testDescription}
      onChange={onChange}
      {...rest}
      multiline
      minRows={3}
      maxRows={5}
      type="text"
      label="Test description"
    />
  );
};

export default TestDescriptionInput;
