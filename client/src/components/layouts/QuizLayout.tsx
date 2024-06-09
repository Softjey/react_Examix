import { Stack, StackProps } from '@mui/material';
import React from 'react';

interface Props extends StackProps {
  centeredProps?: StackProps;
}

const QuizLayout: React.FC<Props> = ({ children, centeredProps, ...rest }) => {
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh" {...rest}>
      <Stack spacing={5} maxWidth={800} width="90%" {...centeredProps}>
        {children}
      </Stack>
    </Stack>
  );
};

export default QuizLayout;
