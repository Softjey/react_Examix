/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */
import { io } from 'socket.io-client';
// eslint-disable-next-line object-curly-newline
import React, { memo, useEffect, useRef, useState } from 'react';

import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import log from './log';

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

const Ava: React.FC<{ name: string }> = memo(({ name }) => (
  <Avatar
    alt="Remy Sharp"
    src={`https://avatar.iran.liara.run/public?username=${name}${Math.random()}`}
  />
));

const StudentPanel: React.FC<Props> = memo(({ name, examCode, onDisconnect }) => {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const socketRef = useRef(
    io('ws://localhost:3005/join-exam', {
      autoConnect: false,
      auth: { role: 'student', examCode, studentName: name },
    }),
  );

  useEffect(() => {
    const socket = socketRef.current;

    socket.connect();
    socket.on('open', log(`${name} connected`));
    socket.on('close', () => {
      log(`${name} disconnected`)();
      onDisconnect();
    });
    socket.on('error', log(`${name} error`));
    socket.on('exception', log(`${name} exception`));
    socket.on('test-info', log(`${name} test-info:`));
    socket.on('student-joined', (body) => setStudentId(body.id));
    socket.on('exam-started', log(`${name} exam-started`));
    socket.on('question', (body) => setQuestion(body));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, examCode]);

  useEffect(() => {
    if (!question) return;

    setTimeout(() => {
      const randomAnswer = question?.answers[Math.floor(Math.random() * question.answers.length)];

      socketRef.current.emit('answer', {
        studentId,
        questionIndex: question?.index,
        answers: [randomAnswer],
      });
      log(`${name} answered ${randomAnswer?.title} to question ${question?.title}`);
    }, Math.random() * 3000);
  }, [question, name, studentId]);

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Ava name={name} />
        </ListItemAvatar>
        <ListItemText
          primary={question?.title || 'No question yet'}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {name}
                {studentId ? ` (${studentId})` : ''}
              </Typography>
              {question &&
                question.answers.map((answer) => (
                  <Typography
                    key={answer.title}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {answer.title}
                  </Typography>
                ))}
            </>
          }
        />
        <Button
          onClick={() =>
            // eslint-disable-next-line implicit-arrow-linebreak
            socketRef.current.emit('answer', {
              studentId,
              questionIndex: question?.index,
              answers: [question?.answers[Math.floor(Math.random() * question.answers.length)]],
            })
          }
        >
          Send random answer
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
});

export default StudentPanel;
