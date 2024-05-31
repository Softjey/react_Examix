import { useQuery } from '@tanstack/react-query';
import { Test } from '../../types/api/entities/test';
import ApiClient from '../../services/Api/ApiClient';
import { QueryKey } from '../../services/Query/types';

export default function useTestName(id?: Test['id']) {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKey.TEST_NAME, id],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      return ApiClient.getTestName(id);
    },
  });

  return { testName: data, ...rest };
}
