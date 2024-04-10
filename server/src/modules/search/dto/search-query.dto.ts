import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiProperty({ default: 9 })
  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(30)
  @Type(() => Number)
  limit: number = 9;
}
