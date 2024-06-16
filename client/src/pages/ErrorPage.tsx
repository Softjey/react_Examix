import React from 'react';
import { Stack, Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';
import { LayoutProps } from '../types/utils/LayoutProps';
import ApiError from '../services/Api/ApiError';
import Error404W from '/images/icon-404-w.png';
import Error404D from '/images/icon-404-d.png';
import { center } from '../styles/flex';

type ErrorDetails = {
  title: string;
  description: string;
};

type Props = LayoutProps & {
  error?: Error;
  errorDetails?: ErrorDetails;
  onGoHome?: () => void;
  actions?: React.ReactNode;
};

const ErrorPage: React.FC<Props> = (props) => {
  const { layout, error, errorDetails, actions, onGoHome, ...rest } = props;
  let status;
  let message;
  let title;

  if (error instanceof ApiError) {
    status = error.status;
    message = error.message;
    title = `Error ${status}`;
  } else if (errorDetails) {
    status = null;
    message = errorDetails.description;
    title = errorDetails.title;
  } else {
    status = null;
    message = 'Oops! Something went wrong.';
    title = 'Unknown error';
  }

  const content = (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      css={{ height: window.innerHeight, width: window.innerWidth }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={6}>
        <img src={Error404W} alt="404" css={{ height: '20vh', width: 'auto' }} />
        <Typography fontWeight={400} variant="h3" color="purple">
          {title}
        </Typography>
      </Stack>

      <Typography variant="h6">{message}</Typography>

      <Stack direction="row" spacing={3} alignItems="center">
        {actions}

        <Button
          to={layout === 'home' ? Routes.HOME : Routes.START}
          onClick={onGoHome}
          variant="contained"
          size="large"
        >
          Go Home
        </Button>
      </Stack>
    </Stack>
  );

  if (layout === 'home') {
    const restProps = rest as HomeLayoutProps;

    return (
      <HomeLayout contentSx={center} {...restProps}>
        {content}
      </HomeLayout>
    );
  }

  return (
    <StartLayout header={false} {...(rest as StartLayoutProps)}>
      {content}
    </StartLayout>
  );
};

export default ErrorPage;
