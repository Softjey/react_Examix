import React from 'react';
import { Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Paper, Stack, Typography } from '@mui/material';
import studentExamStore from '../store/ExamStore/StudentExamStore';
import Routes from '../services/Router/Routes';
import StudentsList from '../components/common/StudentsList';
import BaseTestInfo from '../components/common/BaseTestInfo';
import DottedText from '../dev/DottedText/DottedText';

interface Props {}

const OngoingExamPage: React.FC<Props> = observer(() => {
  const { status, students, test } = studentExamStore;

  if (status === 'idle') {
    return <Navigate to={Routes.JOIN} />;
  }

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack spacing={10} maxWidth={800} width="90%">
        {test && (
          <BaseTestInfo
            test={test}
            action={<DottedText variant="h6">Waiting for the exam to start</DottedText>}
          />
        )}

        <Paper component={Stack} variant="outlined" spacing={4} padding={4}>
          {students?.length !== 0 && (
            <Typography variant="h4" textAlign="center">
              Connected students:
            </Typography>
          )}

          <StudentsList students={students ?? []} sx={{ minHeight: 360 }} />
        </Paper>
      </Stack>
    </Stack>
  );
});

export default OngoingExamPage;
