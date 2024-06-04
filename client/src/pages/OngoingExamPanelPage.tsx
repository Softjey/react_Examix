import React from 'react';
import { Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Stack, Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import StudentsList from '../components/common/StudentsList';
import Button from '../components/UI/buttons/Button';
import teacherExamStore from '../store/ExamStore/TeacherExamStore';
import Routes from '../services/Router/Routes';
import LoadingPage from './LoadingPage';

interface Props extends HomeLayoutProps {}

const OngoingExamPanelPage: React.FC<Props> = observer(({ ...rest }) => {
  const { test, students, status, isLoading } = teacherExamStore;

  if (status === 'idle') {
    return <Navigate to={Routes.HOME} />;
  }

  if (isLoading || !test) {
    return <LoadingPage layout="home" />;
  }

  return (
    <HomeLayout centered {...rest}>
      <BaseTestInfo
        test={test}
        action={
          <Stack direction="row" justifyContent="space-around">
            <Typography align="center" variant="h4" color={(theme) => theme.palette.secondary.dark}>
              {teacherExamStore.examCode}
            </Typography>

            <Button variant="contained" color="secondary">
              Start exam
            </Button>
          </Stack>
        }
      />

      <QuestionsList variant="accordion" questions={test.testQuestions} />

      <StudentsList variant="accordion" students={students ?? []} />
    </HomeLayout>
  );
});

export default OngoingExamPanelPage;
