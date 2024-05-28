import React from 'react';
import { useParams, Navigate } from 'react-router';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import useExam from '../hooks/queries/useExam';
import Routes from '../services/Router/Routes';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import parseNumFromString from '../utils/parseNumFromString';
import ExamResultsTable from '../components/common/ExamResultsTable/ExamResultsTable';

interface Props extends HomeLayoutProps {}

const ExamPage: React.FC<Props> = ({ ...rest }) => {
  const { id } = useParams<{ id: string }>();
  const normalizedId = parseNumFromString(id);
  const { exam, isPending } = useExam(normalizedId);

  if (!id) {
    return <Navigate to={Routes.EXAMS_HISTORY} />;
  }

  if (isPending) {
    return <LoadingPage layout="home" />;
  }

  if (!exam) {
    return <NotFoundPage layout="home" item="Exam" />;
  }

  return (
    <HomeLayout centered {...rest}>
      <BaseTestInfo test={exam.test} />

      <QuestionsList variant="accordion" questions={exam.test.testQuestions} />

      <ExamResultsTable questions={exam.test.testQuestions.concat(exam.test.testQuestions)} />
    </HomeLayout>
  );
};

export default ExamPage;
