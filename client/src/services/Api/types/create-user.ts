import Role from '../../../types/api/Role';
import { User } from '../../../types/api/user';
import { WithMessage } from './utils';

export type CreateUserResponse = WithMessage<{ newUser: User }>;

export interface CreateUserDto {
  email: User['email'];
  password: string;
  name: string;
  role: Role;
}
