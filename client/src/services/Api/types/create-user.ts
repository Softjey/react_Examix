import Role from '../../../types/api/enums/Role';
import { User } from '../../../types/api/entities/user';
import { WithMessage } from './utils';

export type CreateUserResponse = WithMessage<{ newUser: User }>;

export interface CreateUserDto {
  email: User['email'];
  password: string;
  name: string;
  role: Role;
}
