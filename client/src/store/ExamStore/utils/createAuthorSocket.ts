import { SocketOptions, io } from 'socket.io-client';
import { AuthorExamCredentials } from '../../../services/storage/StorageMap';
import { AuthorAuth } from '../types/auth';

function createAuthorSocket(credentials: AuthorExamCredentials, socketOptions?: SocketOptions) {
  const socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
    auth: { role: 'author', ...credentials } as AuthorAuth,
    autoConnect: false,
    ...socketOptions,
  });

  return socket;
}

export default createAuthorSocket;
