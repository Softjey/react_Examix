import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { createDto } from '../helpers/create-dto.helper';
import { ApiProperty } from '@nestjs/swagger';

export interface SearchDtoI {
  search?: string;
}

export const SearchDto = createDto<SearchDtoI>({
  search: [
    ApiProperty({ type: String, minLength: 1, required: false }),
    IsOptional(),
    IsNotEmpty(),
    IsString(),
  ],
});
