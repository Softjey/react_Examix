import { Checkbox, FormControlLabel, FormGroup, FormGroupProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AnswersGroupProps from './AnswersGroupProps';
import { StudentAnswer } from '../../../types/api/entities/question';

interface Props extends AnswersGroupProps, FormGroupProps {}

const MultipleChoice: React.FC<Props> = ({ answers, disabled, onAnswer, sx, ...rest }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<StudentAnswer[]>([]);

  useEffect(() => {
    setSelectedAnswers([]);
  }, [answers]);

  return (
    <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...sx }} {...rest}>
      {answers.map(({ title }) => (
        <FormControlLabel
          key={title}
          onChange={(_, checked) => {
            setSelectedAnswers((prev) => {
              const newAnswers = checked
                ? [...prev, { title }]
                : prev.filter((answer) => answer.title !== title);

              onAnswer(newAnswers);

              return newAnswers;
            });
          }}
          disabled={disabled}
          control={<Checkbox />}
          checked={selectedAnswers.some((answer) => answer.title === title)}
          label={title}
        />
      ))}
    </FormGroup>
  );
};

export default MultipleChoice;
