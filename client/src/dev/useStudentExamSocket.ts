import { Socket } from 'socket.io-client';
import log from './log';
import useExamSocket from './useSocket';
import examCode from '../store/examCode';
import studentName from '../store/studentName';

const useStudentExamSocket = (addListeners: (socket: Socket) => void) => {
  const [socket, isLoading, setIsLoading] = useExamSocket(
    {
      role: 'student',
      examCode: examCode.code,
      studentName: studentName.name,
      // studentId: // later,
      // studentToken: // later
    },
    (newSocket: Socket) => {
      newSocket.io.on('error', log('errorrrrr'));
      newSocket.on('exception', log('exception'));
      newSocket.io.on('open', () => {
        setIsLoading(false);
        log('connected')();
      });
      addListeners(newSocket);
    },
  );
  return { socket, isLoading, setIsLoading };
};

export default useStudentExamSocket;
