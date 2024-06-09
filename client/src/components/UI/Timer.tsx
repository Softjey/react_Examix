import { LinearProgress, LinearProgressProps, Stack } from '@mui/material';
import { StackProps, Typography, TypographyProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import prettifyDuration from '../../utils/time/prettifyDuration';

interface Props extends StackProps {
  duration: number;
  endDate?: Date;
  onEnd?: () => void;
  frameRate?: number;
  restartDeps?: unknown[];
  typographyProps?: TypographyProps;
  progressProps?: LinearProgressProps;
}

const adjustDuration = (duration: number, endDate?: Date) => {
  const endTime = endDate ? endDate.getTime() : Date.now() + duration;

  return Math.min(duration, endTime - Date.now());
};

const Timer: React.FC<Props> = ({ typographyProps, progressProps, endDate, ...props }) => {
  const { onEnd, duration, frameRate = 60, restartDeps = [], ...rest } = props;
  const [remainingTime, setRemainingTime] = useState(() => adjustDuration(duration, endDate));
  const timer = useRef<number>(-1);
  const progress = (remainingTime / duration) * 100;

  useEffect(() => {
    const startTime = Date.now();
    const adjustedDuration = adjustDuration(duration, endDate);

    setRemainingTime(adjustedDuration);

    const stopTimer = () => {
      clearInterval(timer.current);
      onEnd?.();
    };

    timer.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newRemainingTime = adjustedDuration - elapsedTime;

      if (newRemainingTime <= 0) {
        setRemainingTime(0);
        stopTimer();
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 1000 / frameRate);

    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, duration, frameRate, ...restartDeps]);

  return (
    <Stack spacing={1} {...rest}>
      <Typography variant="body2" color={(t) => t.palette.text.secondary} {...typographyProps}>
        {progress > 0 && `Time Left: ${prettifyDuration(remainingTime)}`}
        {progress <= 0 && "Time's up!"}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        {...progressProps}
        sx={{
          '& .MuiLinearProgress-bar': {
            transition: 'none',
          },
          ...progressProps?.sx,
        }}
      />
    </Stack>
  );
};

export default Timer;
