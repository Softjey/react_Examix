import React, { useState, useMemo } from 'react';
import PinCodeManager from '../../utils/pin-code/PinCodeManager';
import useSetPin from '../../hooks/queries/useSetPin';
import usePinUnlock from '../../hooks/queries/usePinUnlock';
import useCheckPassword from '../../hooks/queries/useCheckPassword';
import { SetPinCodeOptions, PinCodeContext } from '../../store/contexts/PinCodeContext';

const PinCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const unlockMutation = usePinUnlock();
  const setPinMutation = useSetPin();
  const checkPasswordMutation = useCheckPassword();

  const [pinCodeIsSet, setPinCodeIsSet] = useState(() => PinCodeManager.isSet());
  const [isLocked, setIsLocked] = useState(() => PinCodeManager.isLocked());

  const value = useMemo(() => {
    const setPinCode = async (
      password: string,
      newPinCode: string | null,
      options?: SetPinCodeOptions,
    ) => {
      checkPasswordMutation.checkPassword(password, {
        onSuccess: () => {
          setPinMutation.setPin(newPinCode, {
            ...options,
            onSuccess: (data, vars, context) => {
              setPinCodeIsSet(!!newPinCode);
              setIsLocked(false);

              if (options && options.onSuccess) {
                options.onSuccess(data, vars, context);
              }
            },
          });
        },
      });
    };

    const unlock = async (pinCode: string) => {
      unlockMutation.unlock(pinCode, {
        onSuccess(correctPinCode) {
          setIsLocked(!correctPinCode);
        },
      });
    };

    const lock = () => {
      PinCodeManager.lock();
      setIsLocked(true);
    };

    return {
      pinCodeIsSet,
      setPinMutation,
      unlockMutation,
      checkPasswordMutation,
      setPinCode,
      isLocked,
      lock,
      unlock,
    };
  }, [isLocked, setPinMutation, unlockMutation, pinCodeIsSet, checkPasswordMutation]);

  return <PinCodeContext.Provider value={value}>{children}</PinCodeContext.Provider>;
};

export default PinCodeProvider;
