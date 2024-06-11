import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
