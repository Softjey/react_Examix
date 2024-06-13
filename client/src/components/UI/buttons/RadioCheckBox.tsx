import { Checkbox, CheckboxProps } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { forwardRef } from 'react';
import QuestionType from '../../../types/api/enums/Type';

interface Props extends CheckboxProps {
  type: QuestionType;
}

// FIXME:
// error when use forwardRef
/*
A component is changing the controlled checked state of SwitchBase to be uncontrolled.
Elements should not switch from uncontrolled to controlled (or vice versa).
Decide between using a controlled or uncontrolled
SwitchBase element for the lifetime of the component.
The nature of the state is determined during the first render.
It's considered controlled if the value is not `undefined`.
*/

const RadioCheckBox = forwardRef<HTMLButtonElement, Props>(({ type, ...props }, ref) => {
  const icon =
    type === QuestionType.SINGLE_CHOICE ? (
      <RadioButtonUncheckedIcon />
    ) : (
      <CheckBoxOutlineBlankIcon />
    );
  const checkedIcon =
    type === QuestionType.SINGLE_CHOICE ? <RadioButtonCheckedIcon /> : <CheckBoxIcon />;
  return <Checkbox icon={icon} checkedIcon={checkedIcon} ref={ref} {...props} />;
});

export default RadioCheckBox;
