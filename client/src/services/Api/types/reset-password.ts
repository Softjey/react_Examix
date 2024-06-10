import { WithMessage } from './utils';

export type ResetPasswordDto = {
  confirmToken: string;
  newPassword: string;
};

export type ResetPasswordResponse = WithMessage;
