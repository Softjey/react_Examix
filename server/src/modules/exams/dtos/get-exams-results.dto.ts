import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';
import { AuthorIdDto } from 'src/utils/validation/dtos/author-Id.dto';
import { PaginationDto } from 'src/utils/validation/dtos/pagination.dto';
import { SearchDto } from 'src/utils/validation/dtos/search.dto';

export class GetExamsResultsDto extends IntersectionType(
  SearchDto(),
  PaginationDto(),
  AuthorIdDto({ authorId: [ApiProperty({ description: 'This param only for admins' })] }),
) {
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(() => Number)
  testId?: number;
}
