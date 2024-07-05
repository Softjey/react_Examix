import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePinCode } from '../../../store/contexts/PinCodeContext';
import { ChangePinCodeSchema, ChangePinCodeSchemaType } from './PinCodeSchemas';
import { CurrentPasswordSchema, CurrentPasswordSchemaType } from './PinCodeSchemas';

export interface Options {
  onClose: () => void;
  resetMode: boolean;
}

const getFormProps = (resetMode: boolean) => {
  if (resetMode) {
    return {
      resolver: zodResolver(CurrentPasswordSchema),
      defaultValues: { currentPassword: '' },
    };
  }

  return {
    resolver: zodResolver(ChangePinCodeSchema),
    defaultValues: { pinCode: '', currentPassword: '' },
  };
};

export default function useSetPinCodeDialog({ onClose, resetMode }: Options) {
  const { setPinCode, setPinMutation, checkPasswordMutation } = usePinCode();
  type Values = typeof resetMode extends true ? CurrentPasswordSchemaType : ChangePinCodeSchemaType;
  const { register, handleSubmit, reset, formState } = useForm<Values>(getFormProps(resetMode));

  const onSubmit = handleSubmit(({ currentPassword, pinCode }) => {
    const newPinCode = pinCode ?? null;

    setPinCode(currentPassword, newPinCode, {
      onSuccess: onClose,
      onSettled: () => reset(),
    });
  });

  const resetError = () => {
    checkPasswordMutation.reset();
    setPinMutation.reset();
  };

  return {
    form: {
      register,
      validationErrors: formState.errors,
      onSubmit,
    },
    query: {
      resetError,
      isPending: checkPasswordMutation.isPending ?? setPinMutation.isPending,
      error: checkPasswordMutation.error ?? setPinMutation.error,
    },
  };
}
