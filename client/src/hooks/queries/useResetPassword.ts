import { useMutation } from '@tanstack/react-query';
import { ResetPasswordDto } from '../../services/Api/types/reset-password';
import ApiClient from '../../services/Api/ApiClient';

export default function useResetPassword() {
  const { mutate, ...rest } = useMutation({
    mutationFn: (dto: ResetPasswordDto) => ApiClient.resetPassword(dto),
  });

  return { resetPassword: mutate, ...rest };
}
