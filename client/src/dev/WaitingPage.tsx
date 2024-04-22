import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import StartLayout from '../components/StartLayout';
import Button from '../components/UI/buttons/Button';
import BookLoader from './BookLoader/BookLoader';
import DottedText from './DottedText/DottedText';
import useStudentExamSocket from './useStudentExamSocket';
import { TestInfo } from './questions';
import { snakeCaseToNormal } from './formatter';

const WaitingPage: React.FC = () => {
  const [testInfo, setTestInfo] = useState<TestInfo | null>(null);
  const { isLoading } = useStudentExamSocket((newSocket: Socket) => {
    newSocket.on('test-info', (newTestInfo) => setTestInfo(newTestInfo));
  });
  return (
    <StartLayout innerStyle={{ gap: '100px' }} header={false}>
      {!isLoading && (
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
          <Button variant="contained" size="large" color="error">
            Leave
          </Button>
        </>
      )}
    </StartLayout>
  );
};

export default WaitingPage;
