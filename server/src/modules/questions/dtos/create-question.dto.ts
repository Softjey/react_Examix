import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { $Enums } from '@prisma/client';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum($Enums.Subject)
  subject?: $Enums.Subject;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

class AnswerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  isCorrect: boolean;
}
