import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import { TestsFilters } from '../../services/Api/types/tests';
import { QueryKey } from '../../services/Query/types';

export default function useTests(filters: TestsFilters = {}) {
  const { search, ...rest } = filters;

  return useQuery({
    queryKey: [QueryKey.TESTS, filters],
    queryFn: () => ApiClient.getTests({ search: search || undefined, ...rest }),
  });
}
