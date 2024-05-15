/* eslint-disable @typescript-eslint/ban-types */
import { User } from '../../types/user';

export type WithMessage<T extends Record<string, unknown> = {}> = {
  message: string;
} & T;

export type AuthResponse = WithMessage<{ user: User }>;
export type CreateUserResponse = WithMessage<{ newUser: User }>;

export interface CreateUserDto {
  email: User['email'];
  password: string;
  name: string;
  role: 'TEACHER' | 'ADMIN';
}
