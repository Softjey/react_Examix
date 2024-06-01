import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router';
import { Stack, Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import teacherExamStore from '../store/ExamStore/TeacherExamStore';
import Routes from '../services/Router/Routes';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import LoadingPage from './LoadingPage';
import StudentsList from '../components/common/StudentsList';
import Button from '../components/UI/buttons/Button';

interface Props extends HomeLayoutProps {}

const OngoingExamPage: React.FC<Props> = observer(({ ...rest }) => {
  if (teacherExamStore.status === 'idle') {
    return <Navigate to={Routes.HOME} />;
  }

  if (teacherExamStore.isLoading || !teacherExamStore.test) {
    return <LoadingPage layout="home" />;
  }

  const { test } = teacherExamStore;

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

      <StudentsList
        variant="accordion"
        students={[
          { name: 'Alex', studentId: '123123' },
          { name: 'John', studentId: '12asdfa124' },
          { name: 'Alice', studentId: '123asfsd25' },
          { name: 'Bob', studentId: '12343fgs126' },
        ]}
      />
    </HomeLayout>
  );
});

export default OngoingExamPage;
