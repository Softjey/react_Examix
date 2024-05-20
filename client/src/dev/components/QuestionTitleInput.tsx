import { TextField, TextFieldProps } from '@mui/material';

interface Props extends TextFieldProps<'standard'> {
  title: string;
}

const QuestionTitleInput: React.FC<Props> = (props) => {
  return (
    <TextField
      size="small"
      autoComplete="off"
      type="text"
      label="Title"
      value={props.title}
      onChange={props.onChange}
      {...props}
    />
  );
};

export default QuestionTitleInput;
