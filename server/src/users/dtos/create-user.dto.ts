import { $Enums, User } from '@prisma/client';

export class CreateUserDto
  implements
    Pick<User, 'email' | 'password' | 'name'>,
    Partial<Pick<User, 'role'>>
{
  email: string;
  name: string;
  password: string;
  role?: $Enums.Role;
}
