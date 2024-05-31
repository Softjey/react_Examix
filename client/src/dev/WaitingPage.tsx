/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import StartLayout from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import BookLoader from './BookLoader/BookLoader';
import DottedText from './DottedText/DottedText';
import studentExamSocket, { MessageNames } from '../store/examSocket';
import { TestInfo } from './questions';
import { camelCaseToNormal, snakeCaseToNormal } from './formatter';
import Routes from '../services/Router/Routes';

interface Error {
  status: number;
  message: string | string[];
}

const WaitingPage: React.FC = () => {
  const [error, setError] = useState<Error | null>();
  const [testInfo, setTestInfo] = useState<TestInfo | null>(null);
  const [isKicked, setIsKicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  studentExamSocket.onOpen(() => setIsLoading(false));
  // studentExamSocket.onClose(() => setIsLoading(true));

  studentExamSocket.on(MessageNames.EXAM_STARTED, () => navigate(Routes.QUIZ));
  studentExamSocket.on(MessageNames.TEST_INFO, (newTestInfo) => setTestInfo(newTestInfo));
  studentExamSocket.on(MessageNames.EXAM_FINISHED, () => navigate(Routes.QUIZ));
  studentExamSocket.on(MessageNames.EXCEPTION, (newException) => {
    // eslint-disable-next-line no-console
    console.error(newException);
    setError(newException);
    setIsLoading(true);
  });
  studentExamSocket.on(MessageNames.STUDENT_JOINED, ({ studentId, studentToken }) => {
    localStorage.setItem('studentAuth', `${studentId}\n${studentToken}`);
  });
  studentExamSocket.on(MessageNames.STUDENT_KICKED, () => {
    setIsKicked(true);
    setIsLoading(true);
  });
  // TODO: Add normal error handling
  // FIXME: fix problem with incorrect connecting

  return (
    <StartLayout header={false}>
      {!isLoading ? (
        <>
          <Typography sx={{ fontWeight: '500' }} variant="h2">
            <DottedText text="Waiting for the exam to start" />
          </Typography>
          <BookLoader />
          {testInfo && (
            <Card sx={{ padding: '15px', borderRadius: '10px', position: 'relative' }}>
              <CardHeader
                title={
                  <Typography variant="h5" color="#1976d2">
                    Exam info
                  </Typography>
                }
              />
              <CardContent
                sx={{
                  display: 'flex',
                  minWidth: '40vw',
                  maxWidth: '60vw',
                  justifyContent: 'space-between',
                }}
              >
                <div className="right">
                  <Typography variant="h6">{testInfo.name}</Typography>
                  <Typography sx={{ maxWidth: '300px' }} variant="body1" color="text.secondary">
                    {testInfo.description}
                  </Typography>
                </div>
                <div
                  className="left"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignSelf: 'end',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h4">{testInfo.questionsAmount}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      questions
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    display: 'flex',
                    flexFlow: 'column wrap',
                    maxHeight: '80px',
                    width: '140px',
                  }}
                >
                  <Typography variant="subtitle1">Subject:</Typography>
                  <Typography sx={{ maxWidth: '80px' }} variant="body1" color="text.secondary">
                    {snakeCaseToNormal(testInfo.subject)}
                  </Typography>

                  <img
                    height="60px"
                    src={`/react_Examix/src/icons/${testInfo.subject}.svg`}
                    alt="icon"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : error ? (
        <>
          <Typography sx={{ fontWeight: '500' }} variant="h2">
            Ooops, something went wrong...
          </Typography>
          <Stack spacing={1}>
            {Array.isArray(error.message) ? (
              error.message.map((msg) => (
                <Alert key={msg} severity="error">
                  <AlertTitle>{camelCaseToNormal(msg)}</AlertTitle>
                </Alert>
              ))
            ) : (
              <Alert severity="error">
                <AlertTitle>{error.message}</AlertTitle>
              </Alert>
            )}
          </Stack>
        </>
      ) : isKicked ? (
        <Alert severity="error">
          <AlertTitle>You have been kicked</AlertTitle>
        </Alert>
      ) : (
        <CircularProgress />
      )}
      <Button onClick={() => navigate(Routes.JOIN)} variant="contained" size="large" color="error">
        Leave
      </Button>
    </StartLayout>
  );
};

export default WaitingPage;
