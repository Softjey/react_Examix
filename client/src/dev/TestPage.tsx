import { List } from '@mui/material';
import { Socket, io } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import StartLayout from '../components/StartLayout';
import StudentPanel from './StudentPanel';
import Button from '../components/UI/buttons/Button';
import log from './log';
import { getRandomName } from './randomNames';
import { Response, createExam } from './createExam';

const TestPage: React.FC = () => {
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [response, setResponse] = useState<Response | null>(null);
  const [students, setStudents] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (response) {
      log('Exam created')();
      const authorSocket = io('ws://localhost:3005/join-exam', {
        autoConnect: false,
        auth: { role: 'author', examCode: response.examCode, authorToken: response.authorToken },
      });

      authorSocket.io.on('open', log('author connected'));
      authorSocket.io.on('close', log('author disconnected'));
      authorSocket.io.on('error', log('author error'));
      authorSocket.on('exception', log('author exception'));
      authorSocket.on('test-info', log('author test-info:'));
      authorSocket.on('student-joined', ({ name, studentId }) => {
        setStudentIds((currStudentIds) => [...currStudentIds, studentId]);
        log('author student-joined')({ name, studentId });
      });
      authorSocket.on('exam-started', log('author exam-started'));
      authorSocket.on('question', log('author question:'));
      authorSocket.on('results', log('author results:'));
      authorSocket.on('exam-finished', log('author exam-finished'));
      authorSocket.on('student-kicked', log('author Student kicked'));

      setSocket(authorSocket);

      log(response.examCode);
    }
  }, [response]);

  const kickRandomStudent = () => {
    const randomStudentId = studentIds[Math.floor(Math.random() * studentIds.length)];
    log('author kick student requested')(randomStudentId);
    socket!.emit('kick-student', { studentId: randomStudentId });
  };

  return (
    <StartLayout style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
      <div css={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>Test Page</h2>
        <Button onClick={async () => setResponse(await createExam(3))} size="large">
          Create Exam
        </Button>
        <Button size="large" onClick={() => socket!.connect()}>
          Connect Author
        </Button>
        {/* eslint-disable-next-line no-console */}
        <Button size="large" onClick={() => console.log(response!.examCode)}>
          Get code
        </Button>
        <Button size="large" onClick={() => setStudents([...students, getRandomName()])}>
          Connect Student
        </Button>
        <Button size="large" onClick={() => socket!.emit('start-exam')}>
          Start exam
        </Button>

        <Button size="large" onClick={kickRandomStudent}>
          Kick Random Student
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
          <StudentPanel
            name={student}
            examCode={response!.examCode}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            onDisconnect={() => setStudents(students.filter((_, index) => index !== i))}
          />
        ))}
      </List>
    </StartLayout>
  );
};

export default TestPage;
