import { TimePickerProps, TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import { forwardRef } from 'react';

interface Props extends TimePickerProps<Dayjs> {
  error?: boolean;
}

const TimeLimitPicker = forwardRef<HTMLDivElement, Props>(
  ({ error, value, onClose, maxTime, onChange, disabled, slotProps, ...props }, ref) => {
    return (
      <TimePicker
        sx={{
          maxWidth: '126px',
          '.MuiInputBase-input': {
            paddingTop: 1,
            paddingBottom: 1,
            '& ~ fieldset': {
              borderColor: error ? (theme) => theme.palette.error.main : 'auto',
            },
          },
          '.MuiInputLabel-root': {
            top: '-8px',
          },
        }}
        views={['hours', 'minutes', 'seconds']}
        format="HH:mm:ss"
        value={value}
        timeSteps={{ minutes: 1, seconds: 5 }}
        maxTime={maxTime}
        skipDisabled
        onClose={onClose}
        onChange={onChange}
        disabled={disabled}
        slotProps={{
          actionBar: { actions: [] },
          ...slotProps,
        }}
        ref={ref}
        {...props}
      />
    );
  },
);

export default TimeLimitPicker;
