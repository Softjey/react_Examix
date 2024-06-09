import { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Controller } from 'react-hook-form';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import useCreateTestForm from '../../hooks/useCreateTestForm';
import TimeLimitPicker from '../UI/inputs/TimeLimitPicker';

interface Props extends TimePickerProps<Dayjs> {
  questionIndex: number;
  error?: boolean;
}

const CreateTestFormTimeLimitPicker: React.FC<Props> = ({ questionIndex, error, ...props }) => {
  const { control, trigger } = useCreateTestForm();

  return (
    <Controller
      name={`questions.${questionIndex}.timeLimit`}
      control={control}
      render={({ field }) => {
        const { onBlur, onChange, ref, value, disabled } = field;

        const onTimeLimitChange = (e: dayjs.Dayjs | null) => {
          onChange(e);
          trigger(`questions.${questionIndex}.timeLimit`);
        };

        return (
          <TimeLimitPicker
            value={value}
            onClose={onBlur}
            onChange={onTimeLimitChange}
            disabled={disabled}
            error={error}
            ref={ref}
            {...props}
          />
        );
      }}
    />
  );
};

export default CreateTestFormTimeLimitPicker;
