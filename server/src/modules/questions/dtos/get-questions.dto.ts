import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { ArrayMinSize, IsEnum, IsOptional } from 'class-validator';
import { AuthorIdDto } from 'src/utils/validation/dtos/author-Id.dto';
import { PaginationDto } from 'src/utils/validation/dtos/pagination.dto';
import { SearchDto } from 'src/utils/validation/dtos/search.dto';
import { TransformToArray } from 'src/utils/validation/transform-to-array.decorator';

export class GetQuestionDto extends IntersectionType(AuthorIdDto(), PaginationDto(), SearchDto()) {
  @ApiProperty({ enumName: 'Type', enum: $Enums.Type, isArray: true })
  @IsOptional()
  @IsEnum($Enums.Type, { each: true })
  @TransformToArray()
  @ArrayMinSize(1)
  types?: $Enums.Type[];

  @ApiProperty({ enumName: 'Subject', enum: $Enums.Subject, isArray: true })
  @ArrayMinSize(1)
  @IsEnum($Enums.Subject, { each: true })
  @IsOptional()
  @TransformToArray()
  subjects?: $Enums.Subject[];
}
