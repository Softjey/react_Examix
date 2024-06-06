import { useSearchParams } from 'react-router-dom';
import isSubject from '../../utils/isSubject';
import useTests from '../../hooks/queries/useTests';
import { TestsFiltersValues } from '../../components/common/TestsFilters';

const mapSearchParams = (searchParams: URLSearchParams) => {
  const subject = searchParams.get('subject');
  const page = searchParams.get('page');
  const paramIsSubject = isSubject(subject);

  return {
    subject: paramIsSubject ? subject : undefined,
    search: searchParams.get('search') ?? undefined,
    subjects: paramIsSubject ? [subject] : undefined,
    page: page ? +page : undefined,
  };
};

export default function useTestsLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, subject, subjects, page } = mapSearchParams(searchParams);
  const { tests, pagesAmount, isLoading, error } = useTests({ limit: 30, search, subjects, page });

  const handleFiltersChange = (filters: TestsFiltersValues) => {
    const newSearchParams = new URLSearchParams(searchParams);

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

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('page', `${newPage}`);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams(newSearchParams);
  };

  return {
    filters: { search, subject, handleFiltersChange },
    pagination: { page, pagesAmount, handlePageChange },
    query: { tests, isLoading, error },
  };
}
