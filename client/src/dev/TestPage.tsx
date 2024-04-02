import { List } from '@mui/material';
import { io } from 'socket.io-client';
import React, { useState } from 'react';
import Layout from '../Layout';
import StudentPanel from './StudentPanel';
import Button from '../components/UI/buttons/Button';
import log from './log';
import { getRandomName } from './randomNames';

const res = {
  message: 'Room was created successfully',
  roomId: '078384',
  authorToken: '0168f979-80ba-4c7c-9015-c5481f150341',
};

const { roomId, authorToken } = res;

const authorSocket = io('ws://localhost:3005/join-room', {
  autoConnect: false,
  auth: { role: 'author', roomId, authorToken },
});

authorSocket.io.on('open', log('author connected'));
authorSocket.io.on('close', log('author disconnected'));
authorSocket.io.on('error', log('author error'));
authorSocket.on('exception', log('author exception'));
authorSocket.on('test-info', log('author test-info:'));
authorSocket.on('student-joined', log('author student-joined'));
authorSocket.on('exam-started', log('author exam-started'));
authorSocket.on('question', log('author question:'));

const TestPage: React.FC = () => {
  const [students, setStudents] = useState<string[]>([]);

  return (
    <Layout style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
      <div css={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>Test Page</h2>

        <Button size="large" onClick={() => authorSocket.emit('start-exam')}>
          Start exam
        </Button>

        <Button size="large" onClick={() => authorSocket.connect()}>
          Connect Author
        </Button>

        <Button size="large" onClick={() => setStudents([...students, getRandomName()])}>
          Connect Student
        </Button>
      </div>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          alignSelf: 'flex-start',
        }}
      >
        {students.map((student, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <StudentPanel name={student} roomId={roomId} key={i} />
        ))}
      </List>
    </Layout>
  );
};

export default TestPage;
