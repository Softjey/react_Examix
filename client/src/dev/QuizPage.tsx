import React, { useState } from 'react';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { Socket } from 'socket.io-client';
import { Navigate } from 'react-router';
import StartLayout from '../components/StartLayout';
import QuizCard from './QuizCard';
import Timer from '../components/UI/Timer';
import { /* questions, */ Question, StudentAnswer, TestInfo } from './questions';
import log from './log';
import { center } from '../styles/flex';
import useStudentExamSocket from './useStudentExamSocket';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';

const QuizPage: React.FC = () => {
  const [currQuestion, setCurrQuestion] = useState<Question | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [testInfo, setTestInfo] = useState<TestInfo | null>(null);
  const [socket, isLoading, setIsLoading] = useStudentExamSocket((newSocket: Socket) => {
    newSocket.on('question', (newQuestion: Question) => {
      setCurrQuestion(newQuestion);
      // eslint-disable-next-line no-console
      console.log(newQuestion);
      setIsLoading(false);
    });
    newSocket.on('exam-finished', () => {
      log('finished')();
      setIsLoading(false);
      setIsFinished(true);
    });
    newSocket.on('test-info', (newTestInfo) => setTestInfo(newTestInfo));
  });

  const sendAnswer = (answer: StudentAnswer[]) => {
    if (socket !== null) {
      socket.emit('answer', answer);
    }
  };

  // const [i, setI] = useState(0);

  if (isFinished) {
    return <Navigate to={Routes.NOT_FOUND_PAGE} />;
  }

  return (
    <StartLayout header={false}>
      {/* {i < questions.length && (
        <>
          <Timer question={questions[i]} onEnd={() => setI((prev) => prev + 1)} />
          <QuizCard question={questions[i]} sendAnswer={sendAnswer} />
        </>
      )} */}
      <Alert>
        <AlertTitle>{testInfo?.questionsAmount}</AlertTitle>
      </Alert>
      {isLoading || currQuestion === null ? (
        <div css={{ width: '120px', height: '120px', ...center }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Timer question={currQuestion} onEnd={() => setIsLoading(true)} />
          <QuizCard question={currQuestion} sendAnswer={sendAnswer} />
        </>
      )}
      {isFinished && (
        <>
          <Alert severity="success">
            <AlertTitle>Finished</AlertTitle>
          </Alert>
          <Button onClick={() => setIsLoading(true)}>restart</Button>
        </>
      )}
    </StartLayout>
  );
};

export default QuizPage;
