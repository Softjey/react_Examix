import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import { columnCenter } from '../styles/flex';
import GlobalSearchBar from '../components/UI/GlobalSearchBar/GlobalSearchBar';
import Logo from '../components/UI/Logo';
import { Question } from '../types/api/entities/question';
import QuestionDialog from '../components/common/QuestionDialog';
import Routes from '../services/Router/Routes';

interface Props extends HomeLayoutProps {}

const HomePage: React.FC<Props> = ({ ...rest }) => {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const question = state?.question as Question | undefined;
  const handleClose = () => {
    setQuery('');
    navigate(Routes.HOME);
  };

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
        {question && <QuestionDialog itemProps={{ question }} onClose={handleClose} open />}
        <GlobalSearchBar
          sx={{ maxWidth: 600, width: '90%' }}
          inputValue={query}
          onInputChange={(_, newQuery) => setQuery(newQuery)}
        />
      </Box>
    </HomeLayout>
  );
};

export default HomePage;
