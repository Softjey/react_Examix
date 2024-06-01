import { Checkbox, CheckboxProps } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import QuestionType from '../../../types/api/enums/Type';

interface Props extends CheckboxProps {
  type: QuestionType;
}

const IsCorrectButton: React.FC<Props> = ({ type, ...props }) => {
  const icon =
    type === QuestionType.SINGLE_CHOICE ? (
      <RadioButtonUncheckedIcon />
    ) : (
      <CheckBoxOutlineBlankIcon />
    );
  const checkedIcon =
    type === QuestionType.SINGLE_CHOICE ? <RadioButtonCheckedIcon /> : <CheckBoxIcon />;
  return <Checkbox icon={icon} checkedIcon={checkedIcon} {...props} />;
};

export default IsCorrectButton;
