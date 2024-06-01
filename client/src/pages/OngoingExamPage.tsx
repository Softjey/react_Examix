import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router';
import { Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import teacherExamStore from '../store/ExamStore/TeacherExamStore';
import Routes from '../services/Router/Routes';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import LoadingPage from './LoadingPage';

interface Props extends HomeLayoutProps {}

const OngoingExamPage: React.FC<Props> = observer(({ ...rest }) => {
  if (teacherExamStore.status === 'idle') {
    return <Navigate to={Routes.HOME} />;
  }

  if (!teacherExamStore.isLoading || !teacherExamStore.test) {
    return <LoadingPage layout="home" />;
  }

  const { test } = teacherExamStore;

  return (
    <HomeLayout centered {...rest}>
      <BaseTestInfo
        test={test}
        action={
          <Typography align="center" variant="h4" color={(theme) => theme.palette.secondary.main}>
            {teacherExamStore.examCode}
          </Typography>
        }
      />

      <QuestionsList variant="accordion" questions={test.testQuestions} />
    </HomeLayout>
  );
});

export default OngoingExamPage;
