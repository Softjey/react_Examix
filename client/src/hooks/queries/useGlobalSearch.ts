import { useMutation } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import useDebouncedCallback from '../useDebouncedCallback';

export type GlobalSearchParams = { query: string; limit?: number };

export default function useGlobalSearch() {
  const globalSearchMutation = useMutation({
    mutationFn: async ({ query, limit }: GlobalSearchParams) => {
      const trimmedQuery = query.trim();

      if (trimmedQuery.length === 0) {
        return [];
      }

      return ApiClient.globalSearch(trimmedQuery, limit);
    },
  });
  const debouncedMutate = useDebouncedCallback(globalSearchMutation.mutate, 300);

  return {
    ...globalSearchMutation,
    search: debouncedMutate,
  };
}
