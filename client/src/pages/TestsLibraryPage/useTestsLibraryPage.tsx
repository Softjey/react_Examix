import { useSearchParams } from 'react-router-dom';
import isSubject from '../../utils/isSubject';
import useTests from '../../hooks/queries/useTests';
import { TestsFiltersValues } from '../../components/common/TestsFilters';

const mapSearchParams = (searchParams: URLSearchParams) => {
  const subject = searchParams.get('subject');
  const paramIsSubject = isSubject(subject);

  return {
    subject: paramIsSubject ? subject : undefined,
    search: searchParams.get('search') ?? undefined,
    subjects: paramIsSubject ? [subject] : undefined,
  };
};

export default function useTestsLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, subject, subjects } = mapSearchParams(searchParams);
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

  return {
    tests,
    isLoading,
    error,
    search,
    subject,
    handleFiltersChange,
  };
}
