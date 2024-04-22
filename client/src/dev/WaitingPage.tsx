/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Socket } from 'socket.io-client';
import { Alert, AlertTitle, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import StartLayout from '../components/StartLayout';
import Button from '../components/UI/buttons/Button';
import BookLoader from './BookLoader/BookLoader';
import DottedText from './DottedText/DottedText';
import useStudentExamSocket from './useStudentExamSocket';
import { TestInfo } from './questions';
import { snakeCaseToNormal } from './formatter';
import log from './log';
import Routes from '../services/Router/Routes';

interface Error {
  status: number;
  message: string | string[];
}

const WaitingPage: React.FC = () => {
  const [error, setError] = useState<Error | null>();
  const [testInfo, setTestInfo] = useState<TestInfo | null>(null);
  const [isKicked, setIsKicked] = useState(false);

  const navigate = useNavigate();

  const { isLoading, setIsLoading } = useStudentExamSocket((newSocket: Socket) => {
    newSocket.on('test-info', (newTestInfo) => setTestInfo(newTestInfo));
    newSocket.on('exception', (newException) => {
      setError(newException);
      setIsLoading(true);
    });
    newSocket.on('student-kicked', () => {
      setIsKicked(true);
      setIsLoading(true);
    });
    newSocket.io.on('error', log('error'));
  });
  // TODO: Add error handling

  return (
    <StartLayout innerStyle={{ gap: '100px' }} header={false}>
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
                  <AlertTitle>{msg}</AlertTitle>
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
        ''
      )}
      <Button
        onClick={() => navigate(Routes.JOIN_PAGE)}
        variant="contained"
        size="large"
        color="error"
      >
        Leave
      </Button>
    </StartLayout>
  );
};

export default WaitingPage;
