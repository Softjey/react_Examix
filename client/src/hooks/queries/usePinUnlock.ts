import { useMutation } from '@tanstack/react-query';
import PinCodeManager from '../../utils/pin-code/PinCodeManager';

export default function usePinUnlock() {
  const { mutate: unlock, ...mutation } = useMutation({
    mutationFn: (pinCode: string) => {
      return PinCodeManager.unlock(pinCode);
    },
  });

  return { unlock, ...mutation };
}
