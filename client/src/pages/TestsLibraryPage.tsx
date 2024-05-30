import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import useTests from '../hooks/queries/useTests';
import TestsList from '../components/common/TestsList';
import TestsFilters, { TestsFiltersValues } from '../components/common/TestsFilters';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import isSubject from '../utils/isSubject';

interface Props extends HomeLayoutProps {}

const normalizeSearchParams = (searchParams: URLSearchParams) => {
  const subject = searchParams.get('subject');
  const paramIsSubject = isSubject(subject);

  return {
    subject: paramIsSubject ? subject : undefined,
    search: searchParams.get('search') ?? undefined,
    subjects: paramIsSubject ? [subject] : undefined,
  };
};

const TestsLibraryPage: React.FC<Props> = ({ ...rest }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, subject, subjects } = normalizeSearchParams(searchParams);
  const { tests, isLoading, error } = useTests({ limit: 10, search, subjects });

  const handleFiltersChange = (filters: TestsFiltersValues) => {
    const newSearchParams = new URLSearchParams();

    if (filters.search) {
      newSearchParams.set('search', filters.search);
    } else {
      newSearchParams.delete('search');
    }

    if (filters.subjects) {
      newSearchParams.set('subject', filters.subjects[0]);
    } else {
      newSearchParams.delete('subject');
    }

    setSearchParams(newSearchParams);
  };

  return (
    <HomeLayout centered {...rest}>
      <TestsFilters onFiltersChange={handleFiltersChange} defaultValues={{ search, subject }} />
      <TestsList tests={tests} isLoading={isLoading} error={error?.message} sx={{ mt: 5 }} />
    </HomeLayout>
  );
};

export default TestsLibraryPage;
