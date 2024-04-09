import { Test } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class CreateExamDto {
  @IsNumber()
  testId: Test['id'];
}
