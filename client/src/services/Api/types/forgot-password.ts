import { User } from '../../../types/api/entities/user';

export type ForgotPasswordDto = {
  email: User['email'];
  redirectUrl: string;
};
