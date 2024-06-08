import { Socket } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandlersMap = Record<string, (...args: any[]) => void>;

export default function createOffHandlers(socket: Socket, handlersMap: HandlersMap) {
  return () => {
    return Object.entries(handlersMap).forEach(([event, handler]) => {
      socket.off(event, handler);
    });
  };
}
