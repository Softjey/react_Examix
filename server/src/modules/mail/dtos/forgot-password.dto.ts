import { User } from '@prisma/client';

export interface ForgotPasswordDto {
  email: User['email'];
  name: User['name'];
  token: string;
  redirectUrl: string;
}
