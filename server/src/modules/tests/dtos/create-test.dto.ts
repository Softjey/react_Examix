import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateTestQuestionDto } from './create-test-question.dto';
import { User } from '@prisma/client';

export type CreateTestDtoAuthorId = CreateTestDto & { authorId: User['id'] };
export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestQuestionDto)
  questions: CreateTestQuestionDto[];
}
