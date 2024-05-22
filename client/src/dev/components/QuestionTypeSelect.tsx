import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { snakeCaseToNormal } from '../formatter';
import { QuestionType } from '../questions';

interface Props extends TextFieldProps<'standard'> {
  questionType: QuestionType;
}

const QuestionTypeSelect: React.FC<Props> = ({ questionType, ...rest }) => {
  return (
    <TextField
      size="small"
      value={questionType}
      onChange={rest.onChange}
      select
      sx={{ width: '158px' }}
      {...rest}
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
