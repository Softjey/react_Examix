import { Socket } from 'socket.io-client';
import log from './log';
import useExamSocket from './useSocket';

const useStudentExamSocket = (addListeners: (socket: Socket) => void) => {
  const [socket, isLoading, setIsLoading] = useExamSocket(
    {
      role: 'student',
      examCode: '085397' /* response.examCode */,
      studentName: 'BigDick',
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
  return [socket, isLoading, setIsLoading] as const;
};

export default useStudentExamSocket;
