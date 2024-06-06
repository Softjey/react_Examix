import { useMutation } from '@tanstack/react-query';
import { UpdateMeDto } from '../../services/Api/types/update-me';
import ApiClient from '../../services/Api/ApiClient';
import queryClient from '../../services/Query/queryClient';
import { QueryKey } from '../../services/Query/types';

export default function useUpdateMe() {
  const { mutate: updateMe, ...mutation } = useMutation({
    mutationFn: (dto: UpdateMeDto) => {
      return ApiClient.updateMe(dto);
    },
    onSuccess(user) {
      queryClient.setQueryData([QueryKey.AUTH], user);
    },
  });

  return { updateMe, ...mutation };
}
