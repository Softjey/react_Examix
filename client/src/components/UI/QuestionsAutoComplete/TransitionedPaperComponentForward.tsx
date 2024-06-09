import { forwardRef, ForwardedRef } from 'react';
import { Grow, Paper, PaperProps } from '@mui/material';

interface PaperComponentProps extends PaperProps {
  ref: ForwardedRef<HTMLDivElement>;
}

const TransitionedPaperComponent = (
  paperProps: PaperComponentProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <Grow in timeout={400}>
      <Paper {...paperProps} ref={ref} />
    </Grow>
  );
};

const TransitionedPaperComponentForward = forwardRef<HTMLDivElement, PaperComponentProps>(
  TransitionedPaperComponent,
);

export default TransitionedPaperComponentForward;
