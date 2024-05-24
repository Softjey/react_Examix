import { ChangeEvent, useState } from 'react';
import useExams from '../../hooks/queries/useExams';
import { ExamsFiltersForm } from '../../components/forms/ExamsFilters';
import { ExamsParams } from '../../services/Api/types/exams';

export default function useExamsHistoryPage() {
  const [params, setParams] = useState<ExamsParams>({ limit: 30 });
  const { exams, pagesAmount, ...restQueryParams } = useExams(params);

  const handleFiltersUpdate = (form: ExamsFiltersForm) => {
    const { dateFrom, dateTo, search, test } = form;

    setParams((prevFilters) => ({
      ...prevFilters,
      search: search || undefined,
      dateFrom: dateFrom ? dateFrom.toDate() : undefined,
      dateTo: dateTo ? dateTo.toDate() : undefined,
      testId: test ? test.id : undefined,
    }));
  };

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setParams((prevFilters) => ({ ...prevFilters, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { exams, pagesAmount, params, handleFiltersUpdate, handlePageChange, ...restQueryParams };
}
