import { User } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateUserDto implements Partial<Pick<User, 'photo' | 'name'>> {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsUrl()
  photo?: string;
}
