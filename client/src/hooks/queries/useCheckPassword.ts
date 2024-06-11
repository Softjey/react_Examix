import { useMutation } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';

export default function useCheckPassword() {
  const { mutate: checkPassword, ...mutation } = useMutation({
    mutationFn: async (password: string) => {
      await ApiClient.checkPassword(password);
    },
  });

  return { checkPassword, ...mutation };
}
