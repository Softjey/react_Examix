import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { createDto } from '../helpers/create-dto.helper';
import { ApiProperty } from '@nestjs/swagger';

export interface AuthorIdDtoI {
  authorId?: number;
}

export const AuthorIdDto = createDto<AuthorIdDtoI>({
  authorId: [
    ApiProperty({ type: Number, minimum: 1, required: false }),
    IsOptional(),
    IsInt(),
    IsPositive(),
    Type(() => Number),
  ],
});
