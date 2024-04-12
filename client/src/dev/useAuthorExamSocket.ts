import { Socket } from 'socket.io-client';
import log from './log';
import useExamSocket from './useSocket';

const useAuthorExamSocket = (addListeners: (socket: Socket) => void) => {
  const [socket, isLoading, setIsLoading] = useExamSocket(
    {
      role: 'author',
      authorToken: '2323',
      examCode: '085397' /* response.examCode */,
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

export default useAuthorExamSocket;
