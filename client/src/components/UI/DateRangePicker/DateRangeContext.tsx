import { Dayjs } from 'dayjs';
import { createContext, useContext } from 'react';

interface DateRangeContextI {
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  format: string;
  setDateFrom: (newDate: Dayjs | null) => void;
  setDateTo: (newDate: Dayjs | null) => void;
}
export const DateRangeContext = createContext<DateRangeContextI>({
  dateFrom: null,
  dateTo: null,
  format: 'YYYY-MM-DD',
  setDateFrom: () => {},
  setDateTo: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useDateRange = () => {
  const dateRangeContext = useContext(DateRangeContext);

  if (!dateRangeContext) {
    throw new Error('DatePicker components must be used within a DateRange component');
  }

  return dateRangeContext;
};
