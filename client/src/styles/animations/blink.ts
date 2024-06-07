import { CSSObject, keyframes } from '@emotion/react';

export const blinkAnimation = keyframes(`
  0%, 50% {
    opacity: 1;
  }

  50.1%, 100% {
    opacity: 0;
  }
`);

const blink = (time: number): CSSObject => ({
  animation: `${blinkAnimation} ${time * 2}ms steps(2, start) infinite`,
});

export default blink;
