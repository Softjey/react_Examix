import { User } from '@prisma/client';
import { Socket } from 'socket.io';

export class Author {
  clientId?: Socket['id'];

  constructor(
    readonly user: User,
    readonly authorToken: string,
  ) {}
}
