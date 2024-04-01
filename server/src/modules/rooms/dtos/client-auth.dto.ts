import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsLiteral } from '../../../utils/validation/is-literal.decorator';
import { Room } from '../room.entity';
import { Author } from 'src/modules/authors/author.entity';

export type ClientAuthDto = ClientAuthorAuthDto | ClientStudentAuthDto;

export class ClientAuthorAuthDto {
  @IsLiteral('author')
  role: 'author';

  @IsString()
  @IsNotEmpty()
  roomId: Room['id'];

  @IsUUID()
  @IsOptional()
  authorToken?: Author['authorToken'];
}

export class ClientStudentAuthDto {
  @IsLiteral('student')
  role: 'student';

  @IsString()
  @IsNotEmpty()
  roomId: Room['id'];

  @IsString()
  @IsNotEmpty()
  studentName: string;
}
