// eslint-disable-next-line max-len
import { ArrayMinSize, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, } from 'class-validator'; // prettier-ignore
import { Type } from 'class-transformer';
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { TransformToArray } from 'src/utils/validation/transform-to-array.decorator';

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
  @IsNotEmpty()
  @IsOptional()
  search?: string;

  @IsOptional()
  @ApiProperty({ enumName: 'Subject', enum: $Enums.Subject, isArray: true })
  @ArrayMinSize(1)
  @IsEnum($Enums.Subject, { each: true })
  @TransformToArray()
  subjects?: $Enums.Subject[];

  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  authorId?: number;
}
