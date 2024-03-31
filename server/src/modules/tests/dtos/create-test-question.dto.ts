import { Question } from '@prisma/client';
import { IsInt, Min } from 'class-validator';

export class CreateTestQuestionDto {
  @IsInt()
  @Min(1)
  questionId: Question['id'];

  @IsInt()
  @Min(0)
  maxScore: number;

  @IsInt()
  @Min(1)
  timeLimit: number;
}
