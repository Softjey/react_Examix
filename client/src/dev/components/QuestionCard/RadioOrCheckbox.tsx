import { Checkbox, CheckboxProps, Radio, RadioProps } from '@mui/material';
import QuestionType from '../../../types/api/enums/Type';

type SingleChoiceProps = { type: QuestionType.SINGLE_CHOICE } & RadioProps;
type MultipleChoiceProps = { type: QuestionType.MULTIPLE_CHOICE } & CheckboxProps;

type Props = SingleChoiceProps | MultipleChoiceProps;

const RadioOrCheckbox: React.FC<Props> = ({ type, ...rest }) => {
  if (type === QuestionType.SINGLE_CHOICE) {
    return <Radio {...(rest as RadioProps)} />;
  }
  if (type === QuestionType.MULTIPLE_CHOICE) {
    return <Checkbox {...(rest as CheckboxProps)} />;
  }
  throw new Error('Invalid question type');
};

export default RadioOrCheckbox;
