import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { $Enums } from '@prisma/client';

export class GetTestsDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => String)
  @IsEnum($Enums.Subject, { each: true })
  subjects?: $Enums.Subject[];
}
