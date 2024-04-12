import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

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
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io('ws://localhost:3005/join-exam', { auth });

    addListeners(newSocket);
    setSocket(newSocket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [socket, isLoading, setIsLoading] as const;
};

export default useExamSocket;
