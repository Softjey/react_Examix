import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import React from 'react';
import AnswersGroupProps from './AnswersGroupProps';

interface Props extends AnswersGroupProps, RadioGroupProps {}

const SingleChoice: React.FC<Props> = ({ answers, disabled, onAnswer, sx, ...rest }) => {
  const handleChange = (_: unknown, newValue: string) => {
    onAnswer([{ title: newValue }]);
  };

  return (
    <RadioGroup
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...sx }}
      onChange={handleChange}
      {...rest}
    >
      {answers.map(({ title }) => (
        <FormControlLabel
          key={title}
          disabled={disabled}
          value={title}
          control={<Radio />}
          label={title}
        />
      ))}
    </RadioGroup>
  );
};

export default SingleChoice;
