import { Test } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  testId: Test['id'];
}
