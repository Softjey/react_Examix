import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
// eslint-disable-next-line max-len
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator'; // prettier-ignore

export class CreateUserDto
  implements Pick<User, 'email' | 'password' | 'name'>, Partial<Pick<User, 'role'>>
{
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsStrongPassword(
    { minLength: 8, minLowercase: 0, minSymbols: 0, minNumbers: 0, minUppercase: 0 },
    { message: 'Password have to be at least 8 characters long' },
  )
  password: string;

  @ApiProperty({ enumName: 'Role', enum: $Enums.Role, required: false })
  @IsEnum($Enums.Role)
  role?: $Enums.Role;
}
