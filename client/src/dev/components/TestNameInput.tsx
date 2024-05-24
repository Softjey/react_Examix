import { TextField, TextFieldProps } from '@mui/material';

interface Props extends TextFieldProps<'standard'> {
  testName: string;
}

const TestNameInput: React.FC<Props> = ({ testName, onChange, ...rest }) => {
  return <TextField value={testName} onChange={onChange} {...rest} type="text" label="Test name" />;
};

export default TestNameInput;
