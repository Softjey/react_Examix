import { Box, BoxProps, RadioGroup, RadioGroupProps } from '@mui/material';
import QuestionType from '../../../types/api/enums/Type';

type SingleChoiceProps = { type: QuestionType.SINGLE_CHOICE } & RadioGroupProps;
type MultipleChoiceProps = { type: QuestionType.MULTIPLE_CHOICE } & BoxProps;

type Props = SingleChoiceProps | MultipleChoiceProps;

const RadioCheckBoxGroup: React.FC<Props> = ({ type, ...rest }) => {
  if (type === QuestionType.MULTIPLE_CHOICE) {
    return <Box {...(rest as BoxProps)} />;
  }
  if (type === QuestionType.SINGLE_CHOICE) {
    return <RadioGroup name="test" {...(rest as RadioGroupProps)} />;
  }
  throw new Error('Invalid question type');
};

export default RadioCheckBoxGroup;
