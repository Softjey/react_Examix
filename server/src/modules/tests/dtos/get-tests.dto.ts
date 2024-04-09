import { ArrayMinSize, IsEnum, IsOptional } from 'class-validator';
import { $Enums } from '@prisma/client';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { TransformToArray } from 'src/utils/validation/transform-to-array.decorator';
import { AuthorIdDto } from 'src/utils/validation/dtos/author-Id.dto';
import { PaginationDto } from 'src/utils/validation/dtos/pagination.dto';
import { SearchDto } from 'src/utils/validation/dtos/search.dto';

export class GetTestsDto extends IntersectionType(AuthorIdDto(), PaginationDto(), SearchDto()) {
  @IsOptional()
  @ApiProperty({ enumName: 'Subject', enum: $Enums.Subject, isArray: true })
  @ArrayMinSize(1)
  @IsEnum($Enums.Subject, { each: true })
  @TransformToArray()
  subjects?: $Enums.Subject[];
}
