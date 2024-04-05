import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto
  implements Pick<User, 'email' | 'password' | 'name'>, Partial<Pick<User, 'role'>>
{
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @ApiProperty({ enumName: 'Role', enum: $Enums.Role, required: false })
  @IsEnum($Enums.Role)
  role?: $Enums.Role;
}
