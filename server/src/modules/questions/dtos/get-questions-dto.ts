import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
// eslint-disable-next-line max-len
import { ArrayMaxSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator'; // prettier-ignore

export class GetQuestionDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  authorId?: number;

  @IsNotEmpty()
  @IsString()
  search?: string;

  @IsArray({ each: true })
  @ArrayMaxSize(1)
  @ValidateNested({ each: true })
  @Type(() => String)
  @IsEnum($Enums.Subject)
  @IsOptional()
  subjects?: $Enums.Subject[];
}
