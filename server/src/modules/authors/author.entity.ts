import { User } from '@prisma/client';
import { Socket } from 'socket.io';

export class Author {
  readonly userId: User['id'];
  readonly authorToken: string;
  clientId?: Socket['id'];

  constructor(user: User, authorToken: string) {
    this.authorToken = authorToken;
    this.userId = user.id;
  }
}
