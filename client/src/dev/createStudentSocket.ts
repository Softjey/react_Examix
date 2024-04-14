/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from 'socket.io-client';
import log from './log';

export default function createStudentSocket(
  name: string,
  examCode: string,
  setQuestion: (body: any) => void,
  setStudentAuth: (auth: { studentId: string; studentToken: string }) => void,
  studentId?: string,
  studentToken?: string,
) {
  const socket = io('ws://localhost:3005/join-exam', {
    autoConnect: false,
    auth: {
      role: 'student',
      examCode,
      studentName: name,
      studentId,
      studentToken,
    },
  });

  socket.connect();
  socket.on('open', log(`${name} connected`));
  socket.on('close', log(`${name} close`));
  socket.on('error', log(`${name} error`));
  socket.on('exception', log(`${name} exception`));
  socket.on('test-info', log(`${name} test-info:`));
  socket.on('student-reconnected', log(`${name} student-reconnected`));
  // eslint-disable-next-line @typescript-eslint/no-shadow
  socket.on('student-joined', ({ studentId, studentToken }) => {
    setStudentAuth({ studentId, studentToken });
  });
  socket.on('exam-started', log(`${name} exam-started`));
  socket.on('exam-finished', log(`${name} exam-finished`));
  socket.on('question', (body) => setQuestion(body));
  socket.on('disconnect', log(`${name} disconnect`));
  // eslint-disable-next-line @typescript-eslint/no-shadow
  socket.on('student-kicked', ({ studentId }) => {
    log(`${name} student-kicked`)({ studentId });
  });

  return socket;
}
