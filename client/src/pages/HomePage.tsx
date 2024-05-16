import React from 'react';
import { Box } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import { columnCenter } from '../styles/flex';
import GlobalSearchBar from '../components/UI/GlobalSearchBar/GlobalSearchBar';
import Logo from '../components/UI/Logo';

interface Props extends HomeLayoutProps {}

const HomePage: React.FC<Props> = ({ ...rest }) => {
  return (
    <HomeLayout contentSx={{ display: 'flex', alignItems: 'center' }} {...rest}>
      <Box
        sx={{
          ...columnCenter,
          gap: '32px',
          width: '100%',
          paddingBottom: '200px',
        }}
      >
        <Logo />
        <GlobalSearchBar sx={{ maxWidth: 600, width: '90%' }} />
      </Box>
    </HomeLayout>
  );
};

export default HomePage;
