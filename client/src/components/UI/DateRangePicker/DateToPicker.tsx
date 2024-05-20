import { Dayjs } from 'dayjs';
import { DateValidationError } from '@mui/x-date-pickers/models';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/models';
import React, { useLayoutEffect } from 'react';
import { useDateRange } from './DateRangeContext';
import DatePicker, { DatePickerProps } from './DatePicker';

interface DateToPickerProps extends Omit<DatePickerProps, 'value' | 'minDate'> {}

const DateToPicker: React.FC<DateToPickerProps> = ({ initialValue, onChange, ...rest }) => {
  const { dateTo, dateFrom, setDateTo } = useDateRange();
  const handleChange = (
    date: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>,
  ) => {
    setDateTo(date);
    onChange?.(date, context);
  };

  useLayoutEffect(() => {
    if (initialValue) {
      setDateTo(initialValue);
    }
  }, [initialValue, setDateTo]);

  return (
    <DatePicker
      minDate={dateFrom ?? undefined}
      value={dateTo}
      onClear={() => setDateTo(null)}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default DateToPicker;
