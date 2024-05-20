import { Dayjs } from 'dayjs';
import { DateValidationError } from '@mui/x-date-pickers/models';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/models';
import React, { useLayoutEffect, useRef } from 'react';
import DatePicker, { DatePickerProps } from './DatePicker';
import { useDateRange } from './DateRangeContext';

interface DateFromPickerProps extends Omit<DatePickerProps, 'value' | 'maxDate'> {}

const DateFromPicker: React.FC<DateFromPickerProps> = ({
  initialValue,
  onChange,
  format: specifiedFormat,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dateTo, dateFrom, setDateFrom } = useDateRange();
  const handleChange = (
    date: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>,
  ) => {
    setDateFrom(date);
    onChange?.(date, context);
  };

  useLayoutEffect(() => {
    if (initialValue) {
      setDateFrom(initialValue);
    }
  }, [initialValue, setDateFrom]);

  return (
    <DatePicker
      maxDate={dateTo ?? undefined}
      value={dateFrom}
      inputRef={inputRef}
      onClear={() => setDateFrom(null)}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default DateFromPicker;
