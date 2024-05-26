import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';
import { LayoutProps } from '../types/utils/LayoutProps';
import { center } from '../styles/flex';

type Props = LayoutProps & {
  item?: string;
};

const NotFoundPage: React.FC<Props> = ({ layout, item, ...rest }) => {
  const navigate = useNavigate();

  const content = (
    <>
      <h1>404</h1>
      <h2>{item ?? 'Page'} Not Found</h2>

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

export default NotFoundPage;
