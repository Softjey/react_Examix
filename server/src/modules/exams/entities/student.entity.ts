import { Socket } from 'socket.io';

export class Student {
  constructor(
    public readonly id: string,
    public clientId: Socket['id'],
    public name: string,
  ) {}
}
