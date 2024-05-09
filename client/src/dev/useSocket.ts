import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import StudentExamSocket from '../store/examSocket';

interface StudentAuth {
  role: 'student';
  examCode: string;
  studentName: string;
  studentId?: string;
  studentToken?: string;
}

interface AuthorAuth {
  role: 'author';
  examCode: string;
  authorToken: string;
}

type Auth = AuthorAuth | StudentAuth;

const useExamSocket = (auth: Auth, addListeners: (socket: Socket) => void) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_SERVER_HTTP_URL}/join-exam`, { auth });

    addListeners(newSocket);
    /* setSocket(newSocket); */
    StudentExamSocket.setSocket(newSocket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [StudentExamSocket.socket, isLoading, setIsLoading] as const;
};

export default useExamSocket;
