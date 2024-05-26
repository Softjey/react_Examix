import React from 'react';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import parseNumFromString from '../utils/parseNumFromString';
import useTest from '../hooks/queries/useTest';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import { columnCenter } from '../styles/flex';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';

interface Props extends HomeLayoutProps {}

const TestPage: React.FC<Props> = ({ ...rest }) => {
  const { id } = useParams<{ id: string }>();
  const normalizedId = parseNumFromString(id);
  const { test, isLoading, isError } = useTest(normalizedId);

  if (isError || !normalizedId) {
    return <NotFoundPage layout="home" item="Test" />;
  }

  if (!test || isLoading) {
    return <LoadingPage layout="home" />;
  }

  return (
    <HomeLayout contentSx={columnCenter} {...rest} position="relative" overflow="visible">
      <Box sx={{ p: 2, maxWidth: 1000, width: '95%', overflow: 'visible' }}>
        <BaseTestInfo test={test} />

        <QuestionsList questions={test.testQuestions} />
      </Box>
    </HomeLayout>
  );
};

export default TestPage;
