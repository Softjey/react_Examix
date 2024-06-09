import { useRef } from 'react';

const useIds = () => {
  const counterRef = useRef<number>(0);

  const getId = () => {
    counterRef.current += 1;
    return counterRef.current;
  };

  return getId;
};

export default useIds;
