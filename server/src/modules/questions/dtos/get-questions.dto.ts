import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
// eslint-disable-next-line max-len
import { ArrayMinSize, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from 'class-validator'; // prettier-ignore
import { TransformToArray } from 'src/utils/validation/transform-to-array.decorator';

export class GetQuestionDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  authorId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string;

  @ApiProperty({ enumName: 'Type', enum: $Enums.Type, isArray: true })
  @IsOptional()
  @IsEnum($Enums.Type, { each: true })
  @TransformToArray()
  @ArrayMinSize(1)
  types?: $Enums.Type[];

  @ApiProperty({ enumName: 'Subject', enum: $Enums.Subject, isArray: true })
  @ArrayMinSize(1)
  @IsEnum($Enums.Subject, { each: true })
  @IsOptional()
  @TransformToArray()
  subjects?: $Enums.Subject[];
}
