import { io } from 'socket.io-client';
import React from 'react';
import Layout from '../Layout';
import Button from '../components/UI/buttons/Button';

function log(message: string) {
  // eslint-disable-next-line no-console
  return (value: unknown = '') => console.log(message, value);
}

const roomId = '086461';
const authorToken = 'c80f59dc-4f6a-4e52-a9ca-4b09818be5b6';

const connectAuthor = () => {
  const socket = io('ws://localhost:3005/join-room', {
    auth: { role: 'author', roomId, authorToken },
  });

  socket.io.on('open', log('author connected'));
  socket.io.on('close', log('author disconnected'));
  socket.io.on('error', log('author error'));
  socket.on('exception', log('author exception'));

  socket.on('student-joined', log('student-joined'));
};

const connectStudent = () => {
  const socket = io('ws://localhost:3005/join-room', {
    auth: { role: 'student', roomId, studentName: 'John Doe' },
  });

  socket.io.on('open', log('student connected'));
  socket.io.on('close', log('student disconnected'));
  socket.io.on('error', log('student error'));
  socket.on('exception', log('student exception'));
}

const TestPage: React.FC = () => (
  <Layout>
    <div>
      <h2>Test Page</h2>
    </div>

    <Button size="large" onClick={connectAuthor}>
      Connect Author
    </Button>

    <Button size="large" onClick={connectStudent}>
      Connect Student
    </Button>
  </Layout>
);

export default TestPage;
