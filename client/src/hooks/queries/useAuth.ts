import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';

export default function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: ApiClient.authenticate,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 120,
    retry: 2,
  });
}
