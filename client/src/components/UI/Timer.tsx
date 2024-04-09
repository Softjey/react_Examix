import { LinearProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface Props {
  seconds: number;
  onEnd: () => void;
}

const Timer: React.FC<Props> = ({ seconds, onEnd }) => {
  const [progress, setProgress] = useState(100);
  const timer = useRef<number>(-1);
  const duration = seconds * 1000;

  const fixProgressAnimationStyles = {
    width: '100%',
    '&[aria-valuenow="100"]': {
      '& > .progressBarInner': {
        transition: 'none',
      },
    },
  };

  const stopTimer = () => {
    clearInterval(timer.current);
    setProgress(100);
  };

  const startTimer = () => {
    const startTime = Date.now();
    stopTimer();

    timer.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = ((duration - elapsedTime) / duration) * 100;

      setProgress(Math.min(newProgress, 100));
    }, 1000 / 60);
  };

  useEffect(() => {
    if (progress <= 0) {
      stopTimer();
      onEnd();
    }
  }, [onEnd, progress]);

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LinearProgress
      sx={fixProgressAnimationStyles}
      classes={{ bar: 'progressBarInner' }}
      variant="determinate"
      value={progress}
    />
  );
};

export default Timer;
