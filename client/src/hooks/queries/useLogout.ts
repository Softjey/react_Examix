import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import Routes from '../../services/Router/Routes';
import { QueryKey } from '../../services/Query/types';

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: () => ApiClient.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QueryKey.AUTH] });
      navigate(Routes.START);
    },
  });

  return logoutMutation;
}
