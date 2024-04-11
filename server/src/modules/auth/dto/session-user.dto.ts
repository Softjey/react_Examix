import { User } from '@prisma/client';

export class SessionUserDto implements Pick<User, 'id' | 'email' | 'password'> {
  id: User['id'];
  email: User['email'];
  password: User['password'];
}
