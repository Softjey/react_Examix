import { LinearProgress, LinearProgressProps, Stack } from '@mui/material';
import { StackProps, Typography, TypographyProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import prettifyDuration from '../../utils/time/prettifyDuration';

interface Props extends StackProps {
  duration: number;
  onEnd?: () => void;
  frameRate?: number;
  restartDeps?: unknown[];
  typographyProps?: TypographyProps;
  progressProps?: LinearProgressProps;
}

const Timer: React.FC<Props> = ({ typographyProps, progressProps, ...props }) => {
  const { onEnd, duration, frameRate = 60, restartDeps = [], ...rest } = props;
  const [remainingTime, setRemainingTime] = useState(duration);
  const progress = (remainingTime / duration) * 100;
  const timer = useRef<number>(-1);

  useEffect(() => {
    const startTime = Date.now();

    const stopTimer = () => {
      clearInterval(timer.current);
      onEnd?.();
    };

    timer.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newRemainingTime = duration - elapsedTime;

      if (newRemainingTime <= 0) {
        setRemainingTime(0);
        stopTimer();
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 1000 / frameRate);

    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, frameRate, ...restartDeps]);

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
