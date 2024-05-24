import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../services/Query/types';
import ApiClient from '../../services/Api/ApiClient';
import { ExamsParams } from '../../services/Api/types/exams';

export default function useExams(filters: ExamsParams) {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKey.EXAMS, filters],
    queryFn: () => ApiClient.getExams(filters),
  });
  const { amount, exams, pagesAmount } = data ?? {};

  return { ...rest, amount, exams, pagesAmount };
}
