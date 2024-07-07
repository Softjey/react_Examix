import { MenuItem, TextFieldProps, TextFieldVariants } from '@mui/material';
import QuestionType from '../../../types/api/enums/Type';
import underscoreToUpperToSentence from '../../../utils/underscoreToUpperToSentence';
import Select from '../Select';

type Props<T extends TextFieldVariants> = TextFieldProps<T>;

const QuestionTypeSelect = <T extends TextFieldVariants>(props: Props<T>) => {
  return (
    <Select {...props} size="small" sx={{ width: '158px' }}>
      {(Object.values(QuestionType) as Array<keyof typeof QuestionType>).map((type) => (
        <MenuItem
          disabled={type === QuestionType.SHORT_ANSWER || type === QuestionType.TRUE_FALSE}
          key={type}
          value={type}
        >
          {underscoreToUpperToSentence(type)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default QuestionTypeSelect;
