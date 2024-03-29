import { Test, User } from '@prisma/client';

export interface Room {
  id: string;
  testId: Test['id'];
  authorId: User['id'];
  authorToken: string;
}
