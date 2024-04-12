/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { Socket } from 'socket.io-client';
import StartLayout from '../components/StartLayout';
import QuizCard from './QuizCard';
import Timer from '../components/UI/Timer';
import { Question, StudentAnswer } from './questions';
import log from './log';
import { center } from '../styles/flex';
import useStudentExamSocket from './useStudentExamSocket';
import Button from '../components/UI/buttons/Button';

const QuizPage: React.FC = () => {
  const [currQuestion, setCurrQuestion] = useState<Question | null>(null);
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
    });
  });

  const sendAnswer = (answer: StudentAnswer[]) => {
    if (socket !== null) {
      socket.emit('answer', answer);
    }
  };

  useEffect(() => {
    if (currQuestion === null) {
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currQuestion]);

  return (
    <StartLayout>
      {isLoading ? (
        <div css={{ width: '120px', height: '120px', ...center }}>
          <CircularProgress />
        </div>
      ) : currQuestion !== null ? (
        <>
          <Timer question={currQuestion} onEnd={() => setIsLoading(true)} />
          <QuizCard question={currQuestion} sendAnswer={sendAnswer} />
        </>
      ) : (
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
