import { LinearProgress, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Question } from '../../dev/questions';

interface Props {
  question: Question;
  onEnd: () => void;
}

const Timer: React.FC<Props> = ({ onEnd, question: { timeLimit: seconds }, question }) => {
  const [progress, setProgress] = useState(100);
  const timer = useRef<number>(-1);
  const duration = seconds * 1000;

  function formatTime(sec: number): string {
    const hours: number = Math.floor(sec / 3600);
    const minutes: number = Math.floor((sec % 3600) / 60);
    const remainingSeconds: number = sec % 60;

    let formattedTime: string = '';

    if (hours > 0) {
      formattedTime += `${hours} h `;
    }
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes} min `;
    }
    if (remainingSeconds > 0 || (minutes === 0 && hours === 0)) {
      formattedTime += `${remainingSeconds} sec`;
    }

    return formattedTime;
  }

  const fixProgressAnimationStyles = {
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
  }, [question]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      <Typography variant="body2" color="text.secondary" align="left">
        Time Left: {formatTime(Math.ceil((progress * seconds) / 100))}
      </Typography>
      <LinearProgress
        sx={{ ...fixProgressAnimationStyles, borderRadius: '15px' }}
        classes={{ bar: 'progressBarInner' }}
        variant="determinate"
        value={progress}
      />
    </div>
  );
};

export default Timer;
