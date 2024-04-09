import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsLiteral } from '../../../utils/validation/is-literal.decorator';
import { Author } from '../entities/author.entity';

export type ExamClientAuthDto = ClientAuthorAuthDto | ClientStudentAuthDto;

export class ClientAuthorAuthDto {
  @IsLiteral('author')
  role: 'author';

  @IsString()
  @IsNotEmpty()
  examCode: string;

  @IsUUID()
  @IsOptional()
  authorToken?: Author['authorToken'];
}

export class ClientStudentAuthDto {
  @IsLiteral('student')
  role: 'student';

  @IsString()
  @IsNotEmpty()
  examCode: string;

  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsUUID()
  @IsOptional()
  studentToken?: string;
}
