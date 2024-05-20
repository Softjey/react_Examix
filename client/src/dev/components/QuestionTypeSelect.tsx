import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { snakeCaseToNormal } from '../formatter';
import { QuestionType } from '../questions';

interface Props extends TextFieldProps<'standard'> {
  questionType: QuestionType;
}

const QuestionTypeSelect: React.FC<Props> = (props) => {
  return (
    <TextField
      size="small"
      value={props.questionType}
      onChange={props.onChange}
      select
      sx={{ width: '158px' }}
      {...props}
    >
      {(Object.keys(QuestionType) as Array<keyof typeof QuestionType>).map((type) => (
        <MenuItem key={type} value={type}>
          {snakeCaseToNormal(type)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default QuestionTypeSelect;
