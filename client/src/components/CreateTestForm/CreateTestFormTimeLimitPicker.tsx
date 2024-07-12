import { Controller } from 'react-hook-form';
import React from 'react';
import dayjs from 'dayjs';
import { TextFieldProps, TextFieldVariants } from '@mui/material';
import useCreateTestForm from '../../hooks/useCreateTestForm';
import disableDragEvent from '../../pages/CreateTestPage/utils/disableDragEvent';
import TimeLimitPicker from '../UI/inputs/TimeLimitPicker';

type Props<T extends TextFieldVariants> = TextFieldProps<T> & {
  questionIndex: number;
};

const CreateTestFormTimeLimitPicker = <T extends TextFieldVariants>({
  questionIndex,
  ...props
}: Props<T>) => {
  const { control, trigger } = useCreateTestForm();

  return (
    <Controller
      name={`questions.${questionIndex}.timeLimit`}
      control={control}
      render={({ field }) => {
        const { onBlur, onChange, value, disabled } = field;

        const onTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(dayjs(e.target.value, 'HH:mm:ss'));
          trigger(`questions.${questionIndex}.timeLimit`);
        };

        return (
          <TimeLimitPicker
            disabled={disabled}
            type="time"
            value={value.format('HH:mm:ss')}
            onBlur={onBlur}
            onChange={onTimeLimitChange}
            inputProps={{
            step: 1,
            max: '01:00:00',
          }}
            onDragStart={disableDragEvent}
            onDragEnd={disableDragEvent}
            onDragEnter={disableDragEvent}
            variant="outlined"
            {...props}
          />
        );
      }}
    />
  );
};

export default CreateTestFormTimeLimitPicker;
