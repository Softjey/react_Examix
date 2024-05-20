import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers/MobileDatePicker';
import { Dayjs } from 'dayjs';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from '@mui/material';
import { useDateRange } from './DateRangeContext';

export interface DatePickerProps extends MobileDatePickerProps<Dayjs> {
  initialValue?: Dayjs;
  onClear?: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  initialValue,
  onClear,
  sx,
  slotProps,
  format: specifiedFormat,
  ...rest
}) => {
  const { format: pickerFormat } = useDateRange();
  const format = specifiedFormat ?? pickerFormat;

  return (
    <Box position="relative">
      <MobileDatePicker
        format={format}
        slotProps={{ actionBar: { actions: ['accept'] }, ...slotProps }}
        sx={{ width: '100%', ...sx }}
        {...rest}
      />
      <IconButton
        type="button"
        onClick={onClear}
        size="small"
        sx={{
          position: 'absolute',
          top: '50%',
          right: '4px',
          transform: 'translateY(-50%)',
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default DatePicker;
