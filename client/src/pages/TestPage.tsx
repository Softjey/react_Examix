import React from 'react';
import { useParams } from 'react-router';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import parseNumFromString from '../utils/parseNumFromString';
import useTest from '../hooks/queries/useTest';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import CreateExamButton from '../components/UI/buttons/CreateExamButton';

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
    <HomeLayout centered {...rest}>
      <BaseTestInfo test={test} action={<CreateExamButton testId={test.id} />} />

      <QuestionsList questions={test.testQuestions} />
    </HomeLayout>
  );
};

export default TestPage;
