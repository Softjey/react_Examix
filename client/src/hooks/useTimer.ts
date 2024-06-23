import { useState, useEffect } from 'react';

const useTimer = (initialTime: number, isActive: boolean, onComplete: () => void) => {
  const [timer, setTimer] = useState<number>(initialTime);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          onComplete();
          return initialTime;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [isActive, initialTime, onComplete]);

  return [timer, setTimer] as const;
};

export default useTimer;
