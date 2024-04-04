import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateTestQuestionDto } from './create-test-question.dto';
import { User, $Enums } from '@prisma/client';

export type CreateTestDtoAuthorId = CreateTestDto & { authorId: User['id'] };
export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum($Enums.Subject)
  @IsOptional()
  subject?: $Enums.Subject;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestQuestionDto)
  questions: CreateTestQuestionDto[];
}
