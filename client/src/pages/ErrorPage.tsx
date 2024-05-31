import React from 'react';
import { Stack, Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';
import { LayoutProps } from '../types/utils/LayoutProps';
import ApiError from '../services/Api/ApiError';
import sadSmile from '/images/sad-smile.svg';
import { center } from '../styles/flex';

type ErrorDetails = {
  title: string;
  description: string;
};

type Props = LayoutProps & {
  error?: Error;
  errorDetails?: ErrorDetails;
  refreshPage?: () => void;
};

const ErrorPage: React.FC<Props> = ({ layout, error, errorDetails, refreshPage, ...rest }) => {
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
    <Stack spacing={2} alignItems="center">
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={8}>
        <img src={sadSmile} alt="sad smile" css={{ height: '200px', width: 'auto' }} />
        <Typography fontWeight={400} variant="h2" color="error">
          {title}
        </Typography>
      </Stack>

      <Typography variant="h6">{message}</Typography>

      <Stack direction="row" spacing={3} alignItems="center">
        {refreshPage && (
          <Button onClick={refreshPage} size="large">
            Try again
          </Button>
        )}
        <Button to={Routes.HOME} variant="contained" size="large">
          Go Home
        </Button>
      </Stack>
    </Stack>
  );

  if (layout === 'home') {
    const props = rest as HomeLayoutProps;

    return (
      <HomeLayout contentSx={center} {...props}>
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
