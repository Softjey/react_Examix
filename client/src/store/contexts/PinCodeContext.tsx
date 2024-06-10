import { createContext, useContext } from 'react';
import { MutateOptions } from '@tanstack/react-query';
import useSetPin from '../../hooks/queries/useSetPin';
import usePinUnlock from '../../hooks/queries/usePinUnlock';
import useCheckPassword from '../../hooks/queries/useCheckPassword';

export type SetPinCodeOptions = MutateOptions<void, Error, string | null, unknown>;

export interface PinCodeContextInterface {
  isLocked: boolean;
  pinCodeIsSet: boolean;
  setPinMutation: ReturnType<typeof useSetPin>;
  unlockMutation: ReturnType<typeof usePinUnlock>;
  checkPasswordMutation: ReturnType<typeof useCheckPassword>;
  lock: () => void;
  setPinCode: (
    password: string,
    newPinCode: string | null,
    options: SetPinCodeOptions,
  ) => Promise<void>;
  unlock: (pinCode: string) => Promise<void>;
}

export const PinCodeContext = createContext<PinCodeContextInterface | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const usePinCode = () => {
  const context = useContext(PinCodeContext);

  if (!context) {
    throw new Error('usePinCode must be used within a PinCodeProvider');
  }

  return context;
};
