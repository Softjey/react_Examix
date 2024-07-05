import React, { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Stack, Typography } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import BaseTestInfo from '../components/common/BaseTestInfo';
import QuestionsList from '../components/common/QuestionsList';
import StudentsList from '../components/common/StudentsList';
import authorExamStore from '../store/ExamStore/AuthorExamStore';
import Routes from '../services/Router/Routes';
import LoadingPage from './LoadingPage';
import ExamResultsTable from '../components/common/ExamResultsTable/ExamResultsTable';
import useDeleteOngoingExam from '../hooks/queries/useDeleteOngoingExam';
import useStartExam from '../hooks/queries/useStartExam';
import LoadingButton from '../components/UI/buttons/LoadingButton';
import AlertSnackbar from '../components/UI/AlertSnackbar';
import useKickStudent from '../hooks/queries/useKickStudent';

interface Props extends HomeLayoutProps {}

const OngoingExamPanelPage: React.FC<Props> = observer(({ ...rest }) => {
  const testId = useMemo(() => authorExamStore?.exam?.test.id, []);
  const navigate = useNavigate();
  const { deleteExam, ...deletion } = useDeleteOngoingExam({
    onSuccess: () => navigate(`${Routes.TEST}/${testId}`),
  });
  const { startExam, ...starting } = useStartExam();
  const { kickStudent, ...kicking } = useKickStudent();
  const isLoading = starting.isPending || deletion.isPending;
  const error = starting.error || deletion.error || kicking.error;
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
          <Stack spacing={1}>
            {status === 'created' && (
              <Typography
                align="center"
                variant="h4"
                color={(theme) => theme.palette.secondary.dark}
              >
                {credentials.examCode}
              </Typography>
            )}

            <Stack direction="row" justifyContent="center" spacing={2}>
              {students?.length !== 0 && status === 'created' && (
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  color="secondary"
                  onClick={startExam}
                >
                  Start Exam
                </LoadingButton>
              )}

              {status !== 'finished' && (
                <LoadingButton
                  loading={isLoading}
                  variant="outlined"
                  color="error"
                  onClick={deleteExam}
                >
                  Delete Exam
                </LoadingButton>
              )}
            </Stack>
          </Stack>
        }
      />

      <QuestionsList variant="accordion" questions={test.testQuestions} />

      <StudentsList
        disableKickButton={status !== 'created'}
        variant="accordion"
        students={students ?? []}
        onKick={({ studentId }) => kickStudent(studentId)}
      />

      {results && results.length > 0 && <ExamResultsTable questions={results} />}

      <AlertSnackbar severity="error" open={!!error} onClose={() => starting.reset()}>
        {error?.message}
      </AlertSnackbar>
    </HomeLayout>
  );
});

export default OngoingExamPanelPage;
