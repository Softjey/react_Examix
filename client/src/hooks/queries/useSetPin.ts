import { useMutation } from '@tanstack/react-query';
import PinCodeManager from '../../utils/pin-code/PinCodeManager';

export default function useSetPin() {
  const { mutate: setPin, ...mutation } = useMutation({
    mutationFn: (pinCode: string | null) => {
      return PinCodeManager.setPin(pinCode);
    },
  });

  return { setPin, ...mutation };
}
