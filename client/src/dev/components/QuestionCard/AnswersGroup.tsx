import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props extends UseFormRegisterReturn<any> {
  questionIndex: number;
}

const AnswersGroup: React.FC<Props> = (props) => {
  const { name, onChange, onBlur, ref, /* required, */ disabled } = props;
  const [value, setValue] = useState<number | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, currentValue: string) => {
    setValue(+event.target.value);
    const answers = [1, 2, 3].map((i) => ({
      title: '',
      isCorrect: i === +currentValue,
    }));

    onChange({ target: { name, value: answers } });
  };

  return (
    <RadioGroup
      name={name}
      onChange={handleChange}
      value={value}
      onBlur={onBlur}
      ref={ref}
      aria-disabled={disabled}
    >
      <FormControlLabel value={1} control={<Radio />} label="Business" />
      <FormControlLabel value={2} control={<Radio />} label="Non-Profit" />
      <FormControlLabel value={3} control={<Radio />} label="Event" />
    </RadioGroup>
  );
};

export default AnswersGroup;
