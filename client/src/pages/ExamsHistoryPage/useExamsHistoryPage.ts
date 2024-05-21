import { useState } from 'react';
import useExams from '../../hooks/queries/useExams';
import { ExamsFiltersForm } from '../../components/forms/ExamsFilters';
import { ExamsFilters } from '../../services/Api/types/exams';

export default function useExamsHistoryPage() {
  const [filters, setFilters] = useState<ExamsFilters>({});
  const { data: exams, ...restQueryParams } = useExams(filters);

  const handleFiltersUpdate = (form: ExamsFiltersForm) => {
    const { dateFrom, dateTo, search, test } = form;

    setFilters({
      search: search || undefined,
      dateFrom: dateFrom ? dateFrom.toDate() : undefined,
      dateTo: dateTo ? dateTo.toDate() : undefined,
      testId: test ? test.id : undefined,
    });
  };

  return { exams, handleFiltersUpdate, ...restQueryParams };
}
