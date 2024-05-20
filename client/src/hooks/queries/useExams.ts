import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../services/Query/types';
import ApiClient from '../../services/Api/ApiClient';
import { ExamsFilters } from '../../services/Api/types/exams';

export default function useExams(filters: ExamsFilters) {
  return useQuery({
    queryKey: [QueryKey.EXAMS, filters],
    queryFn: () => ApiClient.getExams(filters),
  });
}
