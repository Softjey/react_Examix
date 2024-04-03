/* eslint-disable no-alert */
/* eslint-disable no-console */
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '../components/UI/buttons/Button';

const TestPage = () => {
  const [progress, setProgress] = React.useState(100);
  const timer = React.useRef<number>(-1);
  const duration = 5000;

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
      console.log(newProgress);

      setProgress(Math.min(newProgress, 100));
    }, 1000 / 60);
  };

  React.useEffect(() => {
    if (progress <= 0) {
      stopTimer();
      alert('done');
    }
  }, [progress]);

  const fixProgressAnimationStyles = {
    '&[aria-valuenow="100"]': {
      '& > .progressBarInner': {
        transition: 'none',
      },
    },
  };

  return (
    <Box
      sx={{ width: '100%' }}
      css={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LinearProgress
        classes={{ bar: 'progressBarInner' }}
        sx={fixProgressAnimationStyles}
        variant="determinate"
        value={progress}
      />
      <Button
        variant="contained"
        css={{ alignSelf: 'center', marginTop: '200px' }}
        size="large"
        onClick={startTimer}
      >
        Start
      </Button>
      <Button
        variant="contained"
        css={{ alignSelf: 'center', marginTop: '200px' }}
        size="large"
        onClick={stopTimer}
      >
        Stop
      </Button>
    </Box>
  );
};

export default TestPage;
