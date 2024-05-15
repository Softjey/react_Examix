import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import { QueryKey } from '../../services/Query/types';

export default function useAuth() {
  return useQuery({
    queryKey: [QueryKey.AUTH],
    queryFn: ApiClient.authenticate,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 120,
    retry: false,
  });
}
