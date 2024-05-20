import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import FiltersField from '../../components/UI/ExamsFilters/FiltersField';
import useExams from '../../hooks/queries/useExams';
import { ExamsFilters } from '../../services/Api/types/exams';

function getExamsFilters(searchParams: URLSearchParams, dateFormat: string): ExamsFilters {
  const getParam = (name: FiltersField) => searchParams.get(name) || undefined;
  const getDateParam = (name: FiltersField) => {
    const dateValue = getParam(name);

    if (!dateValue) return undefined;

    return dayjs(dateValue, dateFormat).toDate();
  };

  const filters: ExamsFilters = {
    search: getParam(FiltersField.SEARCH),
    dateFrom: getDateParam(FiltersField.DATE_FROM),
    dateTo: getDateParam(FiltersField.DATE_TO),
    testId: getParam(FiltersField.TEST_ID),
  };

  return filters;
}

export default function useExamsHistoryPage() {
  const [searchParams] = useSearchParams();
  const dateFormat = 'YYYY-MM-DD';
  const filters = getExamsFilters(searchParams, 'YYYY-MM-DD');
  const { data: exams, isPending } = useExams(filters);

  return {
    dateFormat,
    exams,
    isPending,
  };
}
