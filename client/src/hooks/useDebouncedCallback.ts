import { useCallback, useRef } from 'react';

export default function useDebouncedCallback<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) {
  const timeoutIdRef = useRef<number | null>(null);

  const debouncedFunction = useCallback(
    (...args: T) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );

  return debouncedFunction;
}
