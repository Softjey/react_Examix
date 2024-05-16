import { useLocation, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import { User } from '../../types/api/user';
import Routes from '../../services/Router/Routes';

export default function useLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: User['email']; password: string }) => {
      return ApiClient.login(email, password);
    },
    onSuccess: () => {
      navigate(location.state?.redirect ?? Routes.HOME, { replace: true });
    },
  });

  return loginMutation;
}
