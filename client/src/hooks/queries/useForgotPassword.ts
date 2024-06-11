import { useMutation } from '@tanstack/react-query';
import ApiClient from '../../services/Api/ApiClient';
import { ForgotPasswordDto } from '../../services/Api/types/forgot-password';

export default function useForgotPassword() {
  const { mutate, ...rest } = useMutation({
    mutationFn: (dto: ForgotPasswordDto) => ApiClient.forgotPassword(dto),
  });

  return { sendRecoveryEmail: mutate, ...rest };
}
