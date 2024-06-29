import { ArrayMinSize, IsArray, IsBoolean, IsEnum } from 'class-validator';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import AllUnique from 'src/utils/validation/decorators/all-unique/all-unique.decorator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enumName: 'Type', enum: $Enums.Type })
  @IsEnum($Enums.Type)
  type: $Enums.Type;

  @ApiProperty({ enumName: 'Subject', enum: $Enums.Subject })
  @IsOptional()
  @IsEnum($Enums.Subject)
  subject?: $Enums.Subject;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @AllUnique({
    mapFn: (answer: AnswerDto) => answer.title,
    itemsName: 'Answers',
  })
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
