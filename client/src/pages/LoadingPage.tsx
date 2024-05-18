import React from 'react';
import { CircularProgress } from '@mui/material';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';

interface Props extends StartLayoutProps {}

const LoadingPage: React.FC<Props> = ({ ...rest }) => {
  return (
    <StartLayout {...rest}>
      <CircularProgress size={60} css={{ marginTop: '30px' }} />
    </StartLayout>
  );
};

export default LoadingPage;
