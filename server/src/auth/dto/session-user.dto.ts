import { User } from '@prisma/client';

export class SessionUserDto implements Pick<User, 'id'> {
  id: number;
}
