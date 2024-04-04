import { useQuery } from '@tanstack/react-query';
import ApiClient from '../api/ApiClient';

export default function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: ApiClient.authenticate,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
}
