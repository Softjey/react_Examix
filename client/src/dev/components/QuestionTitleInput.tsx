import { TextField, TextFieldProps } from '@mui/material';

interface Props extends TextFieldProps<'standard'> {
  title: string;
}

const QuestionTitleInput: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TextField
      size="small"
      autoComplete="off"
      type="text"
      label="Title"
      value={title}
      onChange={rest.onChange}
      {...rest}
    />
  );
};

export default QuestionTitleInput;
