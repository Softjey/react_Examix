import { Socket } from 'socket.io-client';

import React, { memo, useEffect, useState } from 'react';

import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { columnCenter } from '../styles/flex';
import log from './log';
import createStudentSocket from './createStudentSocket';

interface StudentAnswer {
  title: string;
}

interface Question {
  id: number;
  index: number;
  answers: StudentAnswer[];
  type: 'single' | 'multiple';
  title: string;
  maxScore: number;
  timeLimit: number;
}

interface Props {
  name: string;
  examCode: string;
  onDisconnect: () => void;
}

interface StudentAuth {
  studentId: string;
  studentToken: string;
}

const Ava: React.FC<{ name: string }> = memo(({ name }) => (
  <Avatar
    alt="Remy Sharp"
    src={`https://avatar.iran.liara.run/public?username=${name}${Math.random()}`}
  />
));

const StudentPanel: React.FC<Props> = memo(({ name, examCode }) => {
  const [studentAuth, setStudentAuth] = useState<StudentAuth | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [socket, setSocket] = useState<Socket>(() =>
    createStudentSocket(
      name,
      examCode,
      setQuestion,
      setStudentAuth,
      studentAuth?.studentId,
      studentAuth?.studentToken,
    ),
  );

  useEffect(() => {
    setTimeout(() => {
      if (!question) return;
      const randomAnswer = question?.answers[Math.floor(Math.random() * question.answers.length)];

      socket.emit('answer', {
        questionIndex: question?.index,
        answers: [randomAnswer],
        studentId: studentAuth!.studentId,
        studentToken: studentAuth!.studentToken,
      });

      log(`${name} answered ${randomAnswer?.title} to question ${question?.title}`);
    }, Math.random() * 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  return (
    <>
      <ListItem alignItems="flex-start" css={columnCenter}>
        <ListItemAvatar>
          <Ava name={name} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          title={studentAuth ? ` (${studentAuth})` : ''}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {question?.title || 'No question yet'}
              </Typography>
              {question &&
                question.answers.map((answer) => (
                  <Typography
                    key={answer.title}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {` ${answer.title} `}
                  </Typography>
                ))}
            </>
          }
        />
        <Button onClick={() => socket.disconnect()}>Disconnect</Button>
        <Button
          onClick={() => {
            const newSocket = createStudentSocket(
              name,
              examCode,
              setQuestion,
              setStudentAuth,
              studentAuth?.studentId,
              studentAuth?.studentToken,
            );

            setSocket(newSocket);
          }}
        >
          Reconnect
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
});

export default StudentPanel;
