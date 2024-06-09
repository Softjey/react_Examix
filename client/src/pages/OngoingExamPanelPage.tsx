import React from 'react';
import { Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Stack, Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import StudentsList from '../components/common/StudentsList';
import Button from '../components/UI/buttons/Button';
import authorExamStore from '../store/ExamStore/AuthorExamStore';
import Routes from '../services/Router/Routes';
import LoadingPage from './LoadingPage';
import ExamResultsTable from '../components/common/ExamResultsTable/ExamResultsTable';

interface Props extends HomeLayoutProps {}

const OngoingExamPanelPage: React.FC<Props> = observer(({ ...rest }) => {
  const { exam, status, credentials } = authorExamStore;

  if (status === 'idle') {
    return <Navigate to={Routes.HOME} />;
  }

  if (status === 'finished' && exam?.id) {
    return <Navigate to={`${Routes.EXAM}/${exam.id}`} state={{ examFinished: true }} />;
  }

  if (!exam || !credentials) {
    return <LoadingPage layout="home" />;
  }

  const { test, students, results } = exam;

  return (
    <HomeLayout centered {...rest}>
      <BaseTestInfo
        test={test}
        action={
          <Stack direction="row" justifyContent="space-around">
            <Typography align="center" variant="h4" color={(theme) => theme.palette.secondary.dark}>
              {credentials.examCode}
            </Typography>

            {students?.length !== 0 && status === 'created' && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => authorExamStore.startExam()}
              >
                Start exam
              </Button>
            )}
          </Stack>
        }
      />

      <QuestionsList variant="accordion" questions={test.testQuestions} />

      <StudentsList variant="accordion" students={students ?? []} />

      {results && results.length > 0 && <ExamResultsTable questions={results} />}
    </HomeLayout>
  );
});

export default OngoingExamPanelPage;
