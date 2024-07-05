import React, { useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';
import { LayoutProps } from '../types/utils/LayoutProps';
import ApiError from '../services/Api/ApiError';
import { center } from '../styles/flex';
import usePublicFolder from '../hooks/usePublicFolder';
import getRandom from '../utils/getRandom';

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
  const randomNum = useMemo(() => getRandom(1, 5), []);
  const gifSrc = usePublicFolder(`gifs/error/${randomNum}.gif`);

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
    <Stack spacing={4} paddingInline={4} justifyContent="center" alignItems="center">
      <img src={gifSrc} alt={title} css={{ maxWidth: 600, width: '100%', height: 'auto' }} />
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{
          wordBreak: 'break-word',
          wordWrap: 'normal',
        }}
      >
        <Typography
          textAlign="center"
          fontWeight={400}
          variant="h3"
          color={(theme) => theme.palette.error.main}
          maxWidth={1200}
        >
          {title}
        </Typography>

        <Typography textAlign="center" variant="h5" maxWidth={900}>
          {message}
        </Typography>
      </Stack>
      {actions}

      <Stack>
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
    <StartLayout
      boxProps={{ sx: { maxWidth: '100%', height: 'unset' } }}
      header={false}
      {...(rest as StartLayoutProps)}
    >
      {content}
    </StartLayout>
  );
};

export default ErrorPage;
