import { IsStrongPassword, IsUUID } from 'class-validator';

export class ResetPasswordDto {
  @IsUUID()
  confirmToken: string;

  @IsStrongPassword(
    { minLength: 8, minLowercase: 0, minSymbols: 0, minNumbers: 0, minUppercase: 0 },
    { message: 'newPassword have to be at least 8 characters long' },
  )
  newPassword: string;
}
