import { TextField, TextFieldProps } from '@mui/material';

interface Props extends TextFieldProps<'standard'> {}

const TimeLimitInput: React.FC<Props> = (props) => {
  return <TextField size="small" sx={{ maxWidth: '100px' }} label="time limit" {...props} />;
};

export default TimeLimitInput;
