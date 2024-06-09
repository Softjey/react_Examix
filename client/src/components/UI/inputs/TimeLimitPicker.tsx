import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CreateTestForm } from '../../../schemas/createTestFormValidationSchemas';

interface Props extends TimePickerProps<Dayjs> {
  questionIndex: number;
  error?: boolean;
}

const TimeLimitPicker: React.FC<Props> = ({ questionIndex, error, ...props }) => {
  const { control, trigger } = useFormContext<CreateTestForm>();

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
          <TimePicker
            sx={{
              maxWidth: '105px',
              '.MuiInputBase-input': {
                paddingTop: 1,
                paddingBottom: 1,
                '& ~ fieldset': {
                  borderColor: error ? 'red !important' : 'auto',
                },
              },
              '.MuiInputLabel-root': {
                top: '-8px',
              },
            }}
            views={['minutes', 'seconds']}
            format="mm:ss"
            value={value}
            timeSteps={{ minutes: 1, seconds: 5 }}
            maxTime={dayjs().startOf('hour').minute(10)}
            skipDisabled
            onClose={onBlur}
            onChange={onTimeLimitChange}
            disabled={disabled}
            slotProps={{ actionBar: { actions: [] } }}
            ref={ref}
            {...props}
          />
        );
      }}
    />
  );
};

export default TimeLimitPicker;
