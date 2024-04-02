import { io } from 'socket.io-client';
import React, { memo, useEffect, useRef } from 'react';

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

const StudentPanel: React.FC<{ name: string; roomId: string }> = memo(({ name, roomId }) => {
  const [questionId, setQuestionId] = React.useState<number | null>(null);
  const socketRef = useRef(
    io('ws://localhost:3005/join-room', {
      autoConnect: false,
      auth: { role: 'student', roomId, studentName: name },
    }),
  );

  useEffect(() => {
    const socket = socketRef.current;

    socket.connect();
    socket.on('open', log(`${name} connected`));
    socket.on('close', log(`${name} disconnected`));
    socket.on('error', log(`${name} error`));
    socket.on('exception', log(`${name} exception`));
    socket.on('test-info', log(`${name} test-info:`));
    socket.on('student-joined', log(`${name} student-joined:`));
    socket.on('exam-started', log(`${name} exam-started`));
    socket.on('question', (body) => {
      setQuestionId(body.id);
    });
  }, [name, roomId]);

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={`https://avatar.iran.liara.run/public?username=${name}${Math.random()}`}
          />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {name}
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        />
        <Button
          onClick={
            () =>
              // eslint-disable-next-line implicit-arrow-linebreak
              socketRef.current.emit('answer', {
                questionId,
                answerIndexes: [0],
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
