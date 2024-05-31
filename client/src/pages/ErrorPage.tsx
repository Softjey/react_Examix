import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';
import { LayoutProps } from '../types/utils/LayoutProps';
import { center } from '../styles/flex';

type Props = LayoutProps & {
  item?: string;
  errorDescription?: string;
};

const ErrorPage: React.FC<Props> = ({ layout, item, ...rest }) => {
  const navigate = useNavigate();

  const content = (
    <>
      <Typography fontWeight={400} variant="h1" component="h1">
        {item}
      </Typography>
      <Typography variant="h2" component="h2">
        {/* errorDescription  */}
      </Typography>

      <Stack direction="row" spacing={3} alignItems="center">
        <Button onClick={() => navigate(-1)} size="large">
          Go Back
        </Button>
        <Button to={Routes.HOME} variant="contained" size="large">
          Go Home
        </Button>
      </Stack>
    </>
  );

  if (layout === 'home') {
    const props = rest as HomeLayoutProps;

    return (
      <HomeLayout contentSx={{ ...props.contentSx, ...center }} {...props}>
        <Stack spacing={2} alignItems="center">
          {content}
        </Stack>
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
