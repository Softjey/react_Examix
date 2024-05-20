import { Dayjs } from 'dayjs';
import React, { useMemo, useState } from 'react';
import DateToPicker from './DateToPicker';
import DateFromPicker from './DateFromPicker';
import { DateRangeContext } from './DateRangeContext';

interface Props {
  children: React.ReactNode;
  format?: string;
}

const DateRangeProvider: React.FC<Props> = ({ children, format }) => {
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const value = useMemo(
    () => ({
      dateFrom,
      dateTo,
      format: format ?? 'YYYY-MM-DD',
      setDateFrom,
      setDateTo,
    }),
    [dateFrom, dateTo, format],
  );

  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
};

const DateRange = Object.assign(DateRangeProvider, { DateToPicker, DateFromPicker });

export default DateRange;
