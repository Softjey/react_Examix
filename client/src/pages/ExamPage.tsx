import React from 'react';
import { useParams, Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import useExam from '../hooks/queries/useExam';
import Routes from '../services/Router/Routes';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import parseNumFromString from '../utils/parseNumFromString';
import ExamResultsTable from '../components/common/ExamResultsTable/ExamResultsTable';
import authorExamStore from '../store/ExamStore/AuthorExamStore';
import CreateExamButton from '../components/UI/buttons/CreateExamButton';

interface Props extends HomeLayoutProps {}

const ExamPage: React.FC<Props> = observer(({ ...rest }) => {
  const { exam: ongoingExam } = authorExamStore;
  const { id } = useParams<{ id: string }>();
  const normalizedId = parseNumFromString(id);
  const { exam, isPending } = useExam(normalizedId);

  if (!id) {
    return <Navigate to={Routes.EXAMS_HISTORY} />;
  }

  if (ongoingExam?.id === normalizedId) {
    authorExamStore.resetExam();
  }

  if (isPending) {
    return <LoadingPage layout="home" />;
  }

  if (!exam) {
    return <NotFoundPage layout="home" item="Exam" />;
  }

  return (
    <HomeLayout centered {...rest}>
      <BaseTestInfo test={exam.test} action={<CreateExamButton testId={exam.test.id} />} />

      <QuestionsList variant="accordion" questions={exam.test.testQuestions} />

      <ExamResultsTable questions={exam.test.testQuestions} />
    </HomeLayout>
  );
});

export default ExamPage;
