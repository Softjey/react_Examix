import { ManagerOptions, SocketOptions as IoSocketOptions } from 'socket.io-client';

export type SocketOptions = Partial<ManagerOptions & IoSocketOptions>;
