import { useQuery } from '@tanstack/react-query';
import { DetailedTest } from '../../types/api/entities/detailedTest';
import { QueryKey } from '../../services/Query/types';
import ApiClient from '../../services/Api/ApiClient';
import { Nullable } from '../../types/utils/Nullable';

export default function useTest(id: Nullable<DetailedTest['id']>) {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKey.TEST, id],
    queryFn: async () => {
      return id ? ApiClient.getDetailedTest(id) : null;
    },
  });

  return { test: data, ...rest };
}
