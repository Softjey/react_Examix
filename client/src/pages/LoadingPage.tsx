import React from 'react';
import { CircularProgress, Stack } from '@mui/material';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import { LayoutProps } from '../types/utils/LayoutProps';
import Header from '../components/common/Header';
import { center } from '../styles/flex';

const LoadingPage: React.FC<LayoutProps> = ({ layout = 'start', ...rest }) => {
  if (layout === 'home') {
    return (
      <HomeLayout contentSx={center} {...(rest as HomeLayoutProps)}>
        <Stack alignItems="center" pb="120px">
          <Header disableBackBtn />
          <CircularProgress size={60} sx={{ marginTop: '30px' }} />
        </Stack>
      </HomeLayout>
    );
  }

  if (layout === 'start') {
    return (
      <StartLayout {...(rest as StartLayoutProps)}>
        <CircularProgress size={60} sx={{ marginTop: '30px' }} />
      </StartLayout>
    );
  }

  throw new Error('Invalid layout type');
};

export default LoadingPage;
