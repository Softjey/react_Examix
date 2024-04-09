import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { createDto } from '../helpers/create-dto.helper';
import { ApiProperty } from '@nestjs/swagger';

export interface PaginationDtoI {
  page?: number;
  limit?: number;
}

export const PaginationDto = createDto<PaginationDtoI>({
  limit: [
    ApiProperty({ type: Number, minimum: 1, required: false }),
    IsOptional(),
    IsInt(),
    Min(1),
    Type(() => Number),
  ],
  page: [
    ApiProperty({ type: Number, minimum: 1, required: false }),
    IsOptional(),
    IsInt(),
    Min(1),
    Type(() => Number),
  ],
});
