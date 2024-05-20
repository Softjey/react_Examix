import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import FiltersField from './FiltersField';

export default function useExamsFilters() {
  const [searchParams] = useSearchParams();
  const initialValue = (name: FiltersField, defaultValue: string = '') => {
    return searchParams.get(name) ?? defaultValue;
  };

  const dateInitialValue = (name: FiltersField) => {
    const initial = initialValue(name);

    return initial ? dayjs(initial) : undefined;
  };

  return { initialValue, dateInitialValue };
}
