import { useEffect, useState } from 'react';

export default function useCountDown() {
  const [msLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (msLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft((prev) => prev - 500);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, [msLeft]);

  function start(ms: number) {
    setSecondsLeft(ms);
  }

  return { msLeft, start };
}
