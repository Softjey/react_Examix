import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
// eslint-disable-next-line max-len
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from 'class-validator'; // prettier-ignore

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

  @ApiProperty({ enumName: 'Type', enum: $Enums.Type, isArray: true })
  @IsOptional()
  @IsArray({ each: true })
  @ArrayMinSize(1)
  @Type(() => String)
  @IsEnum($Enums.Type, { each: true })
  @ValidateNested({ each: true })
  types?: $Enums.Type[];

  @ApiProperty({ enumName: 'Subject', enum: $Enums.Subject, isArray: true })
  @IsArray({ each: true })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => String)
  @IsEnum($Enums.Subject, { each: true })
  @IsOptional()
  subjects?: $Enums.Subject[];
}
